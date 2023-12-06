import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FailNotifications } from "../../components/Notifications";

export const MovimentacaoDeEstoque = () => {
    const [materiais, setMateriais] = useState([]);
    const { tipoMovimentacao } = useParams();
    const [qtdMetros, setQtdMetros] = useState(0);
    const [, setMaterialSelected] = useState(null);
    const [metrosInput, setMetrosInput] = useState(null);

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

    const handleMovimentaEstoque = async (e) => {
        e.preventDefault();
    };


    return(
        <>
            <Title>Movimentação: {tipoMovimentacao}</Title>
            <h3>Quantidade atual em M²: {qtdMetros}</h3>
            <form onSubmit={handleMovimentaEstoque}>
                <select name="material" onChange={handleMaterialChange}>
                    {materiais.map(mat => (
                        <option key={mat.id} value={mat.estoque.id}>{mat.nome}</option>
                    ))}
                </select>
                <br />
                <input type="text" placeholder="quantidade de metros" onChange={(e) => setMetrosInput(Number(e.target.value))}/>
            </form>
            <Button>Registrar Movimentação</Button>
        </>
    );
};