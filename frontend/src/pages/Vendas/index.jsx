import { FlexCointainer } from "../../components/FlexContainer";
import { Listing } from "../../components/Listing";
import { Title } from "../../components/Title";

export const VendasPage = () => {
    return(
        <div className="VendasPage">
            <FlexCointainer>
                <Title>Vendas</Title>
            </FlexCointainer>
            <Listing></Listing>
        </div>
    );
}