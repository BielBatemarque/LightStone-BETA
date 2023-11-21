import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";

export const MovimentacaoDeEstoque = () => {
    const [materiais, setMateriais] = useState([]);
    const { tipoMovimentacao } = useParams();
    const [qtdMetros, setQtdMetros] = useState(0);
    const [, setMaterialSelected] = useState(null);

    useEffect(() => {
        handleLoadMaterial();
    }, []);

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

    return(
        <>
            <Title>Movimentação: {tipoMovimentacao}</Title>
            <h3>Quantidade atual em M²: {qtdMetros}</h3>
            <form action>
                <select name="material" onChange={handleMaterialChange}>
                    {materiais.map(mat => (
                        <option key={mat.id} value={mat.estoque.id}>{mat.nome}</option>
                    ))}
                </select>
                
            </form>
            <Button>Registrar Movimentação</Button>
        </>
    );
};