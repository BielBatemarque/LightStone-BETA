import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";

export const MateriaisPage = () => {
    return(
        <div className="materiais">
            <FlexCointainer pontas={true} size={'93%'}>
                <Title>Materiais</Title>
                <Button>Novo Material</Button>
            </FlexCointainer>
        </div>
    );
}