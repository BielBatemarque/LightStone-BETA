import { useContext } from "react";
import { globalContext } from "../../context/context";
import { Title } from '../../components/Title';
import { FundoDashBoard } from "./styles";
import { FundoForm, FundoTitle } from "../Clientes/styles";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

export const HomePage = () => {
    const { state } = useContext(globalContext);
    console.log(state);
    
    const vendasData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [{
            label: 'Vendas',
            data: [5000, 7000, 8000, 12000, 15000],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }],
    };
    
    const orcamentosData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [{
            label: 'Orçamentos',
            data: [30, 40, 50, 70, 90],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        }],
    };

    const valorArrecadado = 75000; // Valor arrecadado fixo para exemplo
    const metaArrecadacao = 100000; // Meta de arrecadação
    const faltante = metaArrecadacao - valorArrecadado;
    const progresso = (valorArrecadado / metaArrecadacao) * 100;
    
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
    };
    
    return(
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
                    <div style={{ width: `${progresso}%`, backgroundColor: '#4CAF50', height: '25px', textAlign: 'center', color: 'white', lineHeight: '25px' }}>
                        {`${progresso.toFixed(2)}%`}
                    </div>
                </div>
            </div>
            </FundoDashBoard>
       </> 
    );
};
