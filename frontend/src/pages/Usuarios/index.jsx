import { Button } from '../../components/Button';
import { FlexCointainer } from '../../components/FlexContainer';
import { Listing } from '../../components/Listing';
import { Title } from '../../components/Title/index';

export const Usuarios = () => {
    return(
        <>
            <FlexCointainer size={'93%'} pontas='true'>
                <Title>Usuários</Title>
                <Button>Cadastrar usuário</Button>
            </FlexCointainer>
            <Listing>
                {}
            </Listing>
        </>
    );
};