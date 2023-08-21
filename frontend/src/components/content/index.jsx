import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../../pages/login';
import { HomePage } from '../../pages/Home';

export const Content = () => {
    return(
        <Routes>
            <Route path='/' element={<LoginScreen />}  exact/>
            <Route path='/Home/' element={<HomePage />} />
        </Routes>
    );
}