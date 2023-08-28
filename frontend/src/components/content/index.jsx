import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../../pages/login';
import { HomePage } from '../../pages/Home';
import { ContainerMain } from './styles';

export const Content = () => {
    return(
        <ContainerMain>
            <Routes>
                <Route path='/' element={<LoginScreen />}  exact/>
                <Route path='/Home/' element={<HomePage />} />
            </Routes>
        </ContainerMain>
    );
}