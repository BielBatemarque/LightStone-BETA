import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";

export const OrcamentosPage = () => {
    return(
        <>
            <FlexCointainer pontas={true} size='93%'>
                <Title>Orçamentos</Title>
                <Button>Novo Orçamento</Button>
            </FlexCointainer>
            <Listing>

            </Listing>
        </>
    );
}