import { useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";

export const MovimentacaoDeEstoque = () => {
    const [materiais, setMateriais] = useState([]);
    const { tipoMovimentacao } = useParams();
    const [qtdMetros, setQtdMetros] = useState(0);
    const [materialSelected, setMaterialSelected] = useState(null);

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
        const request = await fetch('http://localhost:8000/materiais/');
        const response = await request.json();

        setMateriais(response);
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
                        <option key={mat.id} value={mat.id}>{mat.nome}</option>
                    ))}
                </select>
                
            </form>
            <Button>Registrar Movimentação</Button>
        </>
    );
}