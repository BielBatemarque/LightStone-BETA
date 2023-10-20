import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../../pages/login';
import { HomePage } from '../../pages/Home';
import { ContainerMain } from './styles';
import { ClientesPage } from '../../pages/Clientes/index';
import { ColaboradorPages } from '../../pages/Colaboradores';
import { EstoquesPage } from '../../pages/Estoques';
import { FornecedoresPage } from '../../pages/Fornecedores';
import { MateriaisPage } from '../../pages/Materiais/index';
import { VendasPage } from '../../pages/Vendas';
import { CadastrarColaboradorPage } from '../../pages/Colaboradores/cadastrarColaborador';
import { RelatoriosPage } from '../../pages/Relatorios';
import { CadastrarCLientePage } from '../../pages/Clientes/cadastrarCLiente';
import { CadastrarFornecedor } from '../../pages/Fornecedores/cadastrarFornecedor';
import { CadastrarMaterialPage } from '../../pages/Materiais/cadastrarMaterial';
import { MovimentacaoDeEstoque } from '../../pages/Estoques/MovimentaçãoDeEstoque';
import { MaisInformacoesFornecedor } from '../../pages/Fornecedores/MaisInformacoesFornecedor';

export const Content = () => {
    return(
        <ContainerMain>
            <Routes>
                <Route path='/' element={<LoginScreen />}  exact/>
                <Route path='/Home/' element={<HomePage />} />
                <Route path='/Clientes/' element={<ClientesPage />}/>
                <Route path='/Colaboradores/' element={<ColaboradorPages/>}/>
                <Route path='/Estoque/' element={<EstoquesPage/>}/>
                <Route path='/Fornecedores/'element={<FornecedoresPage />}/>
                <Route path='/Materiais/' element={<MateriaisPage />}/>
                <Route path='/Vendas/' element={<VendasPage />} />
                <Route path='/Relatorios/' element={<RelatoriosPage />} />
                <Route path='/Clientes/cadastrarCliente/' element={<CadastrarCLientePage />}/>
                <Route path='/Colaboradores/CadastrarColaborador/' element={<CadastrarColaboradorPage />} />
                <Route path='/Fornecedores/cadastrarFornecedor/' element={<CadastrarFornecedor />} /> 
                <Route path='/Materiais/cadastrarMaterial/' element={<CadastrarMaterialPage />} />
                <Route path='/Estoque/movimentacaoDeEstoque/' element={<MovimentacaoDeEstoque />} />
                <Route path='Fornecedor/maisInformacoesFornecedor/:id' element={<MaisInformacoesFornecedor />} /> 
            </Routes>
        </ContainerMain>
    );
}