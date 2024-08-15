import { Title } from "../../components/Title";
import { FlexDiv, FundoForm, FundoTitle } from "../Clientes/styles";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { FlexDivFooter } from './styles';
import { FloatLabel } from '../../components/FloatLabel/index';
import { FormLinePecas } from './styles';
import { StyledSelect } from '../../pages/Materiais/styles';
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";

export const CadastrarOrcamento = () => {
    const [addPc, setAddpc] = useState(false);
    const [peca, setPeca] = useState({});
    const [materiais, setMateriais] = useState([]);
    const { state } = useAuth();
    const [listaPecasOrcamento, setListaPecasOrcamento] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [total, setTotalOrcamento] = useState(0);

    const handleButtonClick = () => {
        setAddpc(prevState => !prevState);
    };

    const handlChangePc = (e) => {
        const { name, value } = e.target;
        setPeca({...peca,[name]:value});
    };

    const handleLoadMateriais = async () => {
        const request = await fetch('http://localhost:8000/materiais/');
        const response = await request.json();

        setMateriais(response);
    };

    const handleLoadClientes = async () => {
        const request = await fetch('http://localhost:8000/clientes/');
        const response = await request.json();

        setClientes(response);
    } 

    const handleCadastraPeca = async () => {
        let precoMaterial = 0;

        for (let material of materiais){
            console.log(material, peca)
            if (material.id  == peca.material){
                precoMaterial = material.preco;
            }
        }

        const request = await fetch('http://localhost:8000/pecas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Token ${state.token}`
            },
            body: JSON.stringify(peca),
        });

        const response = await request.json();
        // console.log(response);
        // console.log(precoMaterial);

        if (request.ok){
            try{
                setListaPecasOrcamento(prevLista => [...prevLista, response]);
                SucssesNotifications('Peça Adicionada com sucesso.')
                
            }catch(erro){
                FailNotifications('Não foi possivel adicionar a peça.')
            }
        }
    }

    useEffect(() => {
        handleLoadMateriais();
    }, [addPc]);

    useEffect(() => {
        handleLoadClientes();
    }, []);

    // console.log(peca);
    // console.log(materiais);
    // console.log(listaPecasOrcamento);

    return(
        <>
            <FundoTitle>
                <Title mt={'0px'}>Novo Orçamento</Title>
            </FundoTitle>
            <FundoForm>
                <h2 style={{
                    margin: '0px',
                    textAlign: 'center',
                }}>Lista de Peças:</h2>


                {/* listagem das peças aqui => quantidade - nome - valor */}

                <FlexDiv>
                    <Button color={'gray'} action={handleButtonClick}>Adicionar Peça</Button>
                </FlexDiv>

                

                { addPc ?
                <FormLinePecas>
                    <FloatLabel text={'Nome'} name={'nome'} onChange={handlChangePc}/> 
                    <FloatLabel text="Descrição" name={'descrição'} onChange={handlChangePc}/>
                    <FloatLabel text="Quantidade de m2" name={'quantidade_metros'} onChange={handlChangePc}/>
                    <StyledSelect name="material" onChange={handlChangePc}>
                        {materiais.map((mat, index) => (
                            <option key={index} value={mat.id}>{mat.nome}</option>
                        ))}
                    </StyledSelect>
                    <Button action={handleCadastraPeca}>Confirmar</Button>
                </FormLinePecas>
                 : null}
                    <br />
                <FlexDiv>
                    <StyledSelect>
                        {clientes.map((cliente, index) => (
                            <option key={index} value={cliente.id}>{cliente.nome}</option>
                        ))}
                    </StyledSelect>
                </FlexDiv>


                <FlexDivFooter>
                    <p>Valor total</p>
                    <p>Qtd items</p>
                </FlexDivFooter>
                <FlexDiv>
                    <Button>Salvar Orçamento</Button>
                </FlexDiv>
            </FundoForm>
        </>
    );
}