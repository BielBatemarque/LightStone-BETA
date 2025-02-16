import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { Estoque } from '../../models/Estoque';
import { useAuth } from '../../hooks/useAuth';
import { FlexDiv, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { FloatLabel } from "../../components/FloatLabel";

export const MovimentacaoDeEstoque = () => {
    const { state } = useAuth();
    const [materiais, setMateriais] = useState([]);
    const { tipoMovimentacao } = useParams();
    const [qtdMetros, setQtdMetros] = useState(0);
    const [ materialSelected, setMaterialSelected] = useState(null);
    const [metrosInput, setMetrosInput] = useState(null);
    const [estoque, setEstoque] = useState(new Estoque());
    const navigate = useNavigate();

    useEffect(() => {
        handleLoadMaterial();
    }, []);

    useEffect(() => {
        if (materiais.length > 0) {
            const firstMaterialId = materiais[0].estoque.id;
            setMaterialSelected(firstMaterialId);
            handleLoadQuantidadeMetros(firstMaterialId);
        }
    }, [materiais]);

    const handleLoadQuantidadeMetros = async (id) => {
        const request = await fetch(`http://localhost:8000/estoques/${id}/`);
        const response = await request.json();

        const { quantidade_metros } = response;
        console.log(response);
        setEstoque(response);

        setQtdMetros(quantidade_metros);
    };

    const handleLoadMaterial = async () => {
        const materiaisRequest = await fetch('http://localhost:8000/materiais/');
        const estoqueRequest = await fetch('http://localhost:8000/estoques/');
    
        const materiaisResponse = await materiaisRequest.json();
        const estoqueResponse = await estoqueRequest.json();
    
        const materiaisComEstoque = materiaisResponse.map(material => {
            const estoqueInfo = estoqueResponse.find(e => e.material === material.id);
    
            return {
                ...material,
                estoque: estoqueInfo || { quantidade_metros: 0 }
            };
        });
    
        setMateriais(materiaisComEstoque);
    };

    const handleMaterialChange = event => {
        const selectedId = event.target.value;
        setMaterialSelected(selectedId);
        handleLoadQuantidadeMetros(selectedId);
    };

    const validaNumero = (valor) => {
        return !isNaN(valor);
    };

    
    useEffect(() => {
      if(!validaNumero(metrosInput)){
            FailNotifications('Favor digite um valor numerico');
        }
    }, [metrosInput]);

    // console.log(materialSelected);

    console.log(estoque);
    
    const handleMovimentaEstoque = async (e) => {
        e.preventDefault(); 

        const api = tipoMovimentacao === 'entrada' ? 
        `http://localhost:8000/entrada_estoque/${estoque.material}/` : `http://localhost:8000/saida_estoque/${estoque.material}/`;
        
        const request = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify({
                'user': state.user,
                'quantidade': Number(metrosInput),
                'tipo': 'entrada',
                'produto': estoque.material,
            }),
        });

        const response = await request.json();
        console.log(response);

        if (request.ok){
            SucssesNotifications('sucesso ao movimentar estoque');
            navigate('/Estoque/');
        }else{
            FailNotifications('Erro na transação');
        }

    };

    // console.log(materiais, estoque.material);


    return(
        <>
            <FundoTitle>
                <Title mt={0}>Movimentação: {tipoMovimentacao}</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm onSubmit={handleMovimentaEstoque}>
                    <h3>Quantidade atual em M²: {qtdMetros}</h3>
                    <span>
                        <b>Material:   </b>
                        <select name="material" onChange={handleMaterialChange}>
                            { materiais.map(mat => (
                                <option key={mat.id} value={mat.estoque.id}>{mat.nome}</option>
                                ))}
                        </select>
                    </span>
                    <br />
                    <FloatLabel type="text" text="quantidade de metros" onChange={(e) => setMetrosInput(Number(e.target.value))}/> <br />
                    <FlexDiv>
                        <Button>Registrar</Button>
                        <Button color={'red'} action={() => navigate('/Estoque/')}>Cancelar</Button>
                    </FlexDiv>
                </StyledForm>
            </FundoForm>
        </>
    );
};