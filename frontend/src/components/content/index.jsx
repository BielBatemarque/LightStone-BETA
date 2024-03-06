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
import { MaisInformacoesCliente } from '../../pages/Clientes/MaisInformacoesCliente';
import { MaisInformacoesColaborador } from '../../pages/Colaboradores/MaisInformacoesColaborador';
import { MaisInformacoesVenda } from '../../pages/Vendas/MaisInformacoesVendas';
import { Usuarios } from '../../pages/Usuarios';
import { MaisInformacoesMaterial } from '../../pages/Materiais/maisInformacoesMateriais';
import { CadastrarUsuarioPage } from '../../pages/Usuarios/cadastrarUsuario';
import { MaisInformacoesUsuarios } from '../../pages/Usuarios/MaisInformacoesUsuario';
import { MaisInformacoesEstoque } from '../../pages/Estoques/MaisInformacoesEstoque';
import { CadastrarVenda } from '../../pages/Vendas/CadastrarVenda';
import { OrcamentosPage } from '../../pages/Orcamentos/index';
import { MaisInformacoesOrcamento } from '../../pages/Orcamentos/MaisInformacoesOrcamento';

export const Content = () => {
    return(
        <ContainerMain>
            <Routes>
                {/* Rotas Princípais*/}
                <Route path='/' element={<LoginScreen />}  exact/>
                <Route path='/Home/' element={<HomePage />} />
                <Route path='/Relatorios/' element={<RelatoriosPage />} />

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
                <Route path='/Usuarios/' element={<Usuarios/>}/>
                <Route path='/Usuarios/cadastrarUsuario/' element={<CadastrarUsuarioPage />} />
                <Route path='/Usuarios/MaisInformacoesUsuario/:id/' element={<MaisInformacoesUsuarios />}/>

                {/* Rotas de Materiais */}
                <Route path='/Materiais/' element={<MateriaisPage />}/>
                <Route path='/Materiais/cadastrarMaterial/' element={<CadastrarMaterialPage />} />
                <Route path='/Materiais/maisInformacoesMaterial/:id/' element={<MaisInformacoesMaterial />}/>


                {/* Rotas de Estoque */}
                <Route path='/Estoque/' element={<EstoquesPage/>}/>
                <Route path='/Estoque/movimentacaoDeEstoque/:tipoMovimentacao/' element={<MovimentacaoDeEstoque />} />
                <Route path='/Estoque/maisInformacoesEstoque/:id/' element={<MaisInformacoesEstoque />}/>

                {/* Rotas de Vendas */}
                <Route path='/Vendas/' element={<VendasPage />} />
                <Route path='/Vendas/MaisInformacoesVenda/:id/' element={<MaisInformacoesVenda />} />
                <Route path='/Vendas/CadastrarVenda/' element={<CadastrarVenda />} />

                {/* Rotas de Orçamentos */}
                <Route path='/Orcamentos' element={<OrcamentosPage />}/>
                <Route path='/Orcamentos/MaisInformacoesOrcamento/:id/' element={<MaisInformacoesOrcamento />}/>

            </Routes>
        </ContainerMain>
    );
};