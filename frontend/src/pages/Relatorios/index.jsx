import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { FailNotifications, SucssesNotifications } from '../../components/Notifications';

export const RelatoriosPage = () => {
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/gerar_pdf/');
          
          if (response.ok) {
           const blob = await response.blob();
           const url = window.URL.createObjectURL(blob);

           const a = document.createElement('a');
           a.href = url;
           a.target = '_blank';
            // a.download = 'relatorio.pdf';
           document.body.appendChild(a);
           a.click();
 
           document.body.removeChild(a);
           SucssesNotifications('Relatório gerado com sucesso');

          } else {
            console.error('Erro na requisição:', response.statusText);
            FailNotifications('Erro ao gerar Relatório');
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      };

    return(
       <>
            <Title>Relatórios</Title>
            <p>Tela da qual poderão ser impressos diversos relatórios no formato PDF</p>
            <Button action={fetchData}>Baixar PDF</Button>
       </> 
    );
};