import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../context/context";
import { Title } from '../../components/Title';
import { FundoDashBoard } from "./styles";
import { FundoTitle } from "../Clientes/styles";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

export const HomePage = () => {
    const [vendasMes, setVendasMes] = useState([]);
    const [orcamentosMes, setOrcamentosMes] = useState([]);
    const [objProgressBar, setObjProgressBar] = useState({});
    const { state } = useContext(globalContext);

    // Função para carregar orçamentos por mês
    const handleLoadOrcamentosMes = async () => {
        const request = await fetch("http://localhost:8000/orcamentos/orcamentos_por_mes/");
        const response = await request.json();
        setOrcamentosMes(response);
    };

    // Função para carregar vendas por mês
    const handleLoadVendasMes = async () => {
        const request = await fetch('http://localhost:8000/vendas/vendas_por_mes/');
        const response = await request.json();
        setVendasMes(response);
    };

    // Função para carregar dados da progress bar
    const handleLoadProgressBar = async () => {
        const request = await fetch('http://localhost:8000/dashboardView/');
        const response = await request.json();
        setObjProgressBar(response);
    };

    useEffect(() => {
        handleLoadOrcamentosMes();
        handleLoadVendasMes();
        handleLoadProgressBar();
    }, []);

    // Função para formatar os meses para exibição
    const formatarMes = (mesAno) => {
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const [ano, mes] = mesAno.split("-");
        return `${meses[parseInt(mes, 10) - 1]} ${ano}`;
    };

    // Preparando dados para o gráfico de Vendas
    const vendasLabels = vendasMes.map(v => formatarMes(v.mes));
    const vendasDataValores = vendasMes.map(v => v.total_valor);

    const vendasData = {
        labels: vendasLabels,
        datasets: [{
            label: 'Vendas',
            data: vendasDataValores,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }],
    };

    // Preparando dados para o gráfico de Orçamentos
    const orcamentosLabels = orcamentosMes.map(o => formatarMes(o.mes));
    const orcamentosDataValores = orcamentosMes.map(o => o.total_valor);

    const orcamentosData = {
        labels: orcamentosLabels,
        datasets: [{
            label: 'Orçamentos',
            data: orcamentosDataValores,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        }],
    };

    // Pegando valores da API para Progress Bar
    const valorArrecadado = objProgressBar.total_vendido_mes || 0;
    const metaArrecadacao = 100000; // Meta fixa de arrecadação
    const faltante = metaArrecadacao - valorArrecadado;
    const progresso = (valorArrecadado / metaArrecadacao) * 100;

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
    };

    return (
       <>
            <FundoTitle>
                <Title mt={0}>Dashboard</Title>
            </FundoTitle>
            <FundoDashBoard style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <div style={{ width: '45%' }}>
                    <Bar data={vendasData} options={options} />
                </div>
                <div style={{ width: '45%' }}>
                    <Bar data={orcamentosData} options={options} />
                </div>
                <div style={{ width: '90%', margin: 'auto', marginTop: '20px', textAlign: 'center' }}>
                    <p>Valor Arrecadado: R$ {valorArrecadado.toLocaleString()}</p>
                    <p>Meta: R$ {metaArrecadacao.toLocaleString()}</p>
                    <p>Faltante: R$ {faltante.toLocaleString()}</p>
                    <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${progresso}%`,
                            backgroundColor: '#4CAF50',
                            height: '25px',
                            textAlign: 'center',
                            color: 'white',
                            lineHeight: '25px'
                        }}>
                            {`${progresso.toFixed(2)}%`}
                        </div>
                    </div>
                </div>
            </FundoDashBoard>
       </> 
    );
};