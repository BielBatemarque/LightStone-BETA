import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MaisInformacoesFornecedor = () => {
    const [fornecedor, setFornecedor] = useState({});
    const { id } = useParams(':id');

    const handleLoadFornecedor = async () => {
        const request = await fetch(`http://localhost:8000/fornecedores/${id}`);
        const response = await request.json();

        setFornecedor(response);
    };

    console.log(id)

    useEffect(() => {
        handleLoadFornecedor();
    }, [id]);

    return(
        <>
            <h1>Fornecedor: {fornecedor.nome_empresa}</h1>
        </>
    );
}