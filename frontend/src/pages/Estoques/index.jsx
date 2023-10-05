import { Button } from '../../components/Button';
import { FlexCointainer } from '../../components/FlexContainer';
import { Listing } from '../../components/Listing';
import { Title } from '../../components/Title/index';

export const EstoquesPage = () => {
    
    return(
        <>
           <FlexCointainer pontas='true' size={'93%'}>
                <Title>Estoque</Title>
                <Button >Registrar Entrada</Button>
           </FlexCointainer>
           <Listing>

           </Listing>
        </>  
    );
}