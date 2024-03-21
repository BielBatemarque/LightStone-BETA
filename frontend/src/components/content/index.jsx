import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../../pages/login';
import { HomePage } from '../../pages/Home';
import { ContainerMain } from './styles';
import { ClientesPage } from '../../pages/Clientes/index';
import { ColaboradorPages } from '../../pages/Colaboradores';
import { FornecedoresPage } from '../../pages/Fornecedores';
import { MateriaisPage } from '../../pages/Materiais/index';
import { CadastrarColaboradorPage } from '../../pages/Colaboradores/cadastrarColaborador';
import { CadastrarCLientePage } from '../../pages/Clientes/cadastrarCLiente';
import { CadastrarFornecedor } from '../../pages/Fornecedores/cadastrarFornecedor';
import { CadastrarMaterialPage } from '../../pages/Materiais/cadastrarMaterial';
import { MaisInformacoesFornecedor } from '../../pages/Fornecedores/MaisInformacoesFornecedor';
import { MaisInformacoesCliente } from '../../pages/Clientes/MaisInformacoesCliente';
import { MaisInformacoesColaborador } from '../../pages/Colaboradores/MaisInformacoesColaborador';
import { MaisInformacoesMaterial } from '../../pages/Materiais/maisInformacoesMateriais';


export const Content = () => {
    return(
        <ContainerMain>
            <Routes>
                {/* Rotas Princípais*/}
                <Route path='/' element={<LoginScreen />}  exact/>
                <Route path='/Home/' element={<HomePage />} />

                {/* Rotas de Clientes */}
                <Route path='/Clientes/' element={<ClientesPage />}/>
                <Route path='/Clientes/cadastrarCliente/' element={<CadastrarCLientePage />}/>
                <Route path='/Clientes/maisInformacoesCliente/:id/' element={<MaisInformacoesCliente/>}/>


                {/* Rotas de Colaboradores */}
                <Route path='/Colaboradores/' element={<ColaboradorPages/>}/>
                <Route path='/Colaboradores/CadastrarColaborador/' element={<CadastrarColaboradorPage />} />
                <Route path='/Colaborador/maisInformacoesColaborador/:id/' element={<MaisInformacoesColaborador />} />



                {/* Rotas de Fornecedores */}
                <Route path='/Fornecedores/'element={<FornecedoresPage />}/>
                <Route path='/Fornecedores/cadastrarFornecedor/' element={<CadastrarFornecedor />} /> 
                <Route path='/Fornecedor/maisInformacoesFornecedor/:id/' element={<MaisInformacoesFornecedor />} /> 

                {/* Rotas de Usuários */}

                {/* Rotas de Materiais */}
                <Route path='/Materiais/' element={<MateriaisPage />}/>
                <Route path='/Materiais/cadastrarMaterial/' element={<CadastrarMaterialPage />} />
                <Route path='/Materiais/maisInformacoesMaterial/:id/' element={<MaisInformacoesMaterial />}/>


            </Routes>
        </ContainerMain>
    );
};