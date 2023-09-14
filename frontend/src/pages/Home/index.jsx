import { useContext } from "react";
import { globalContext } from "../../context/context";

export const HomePage = () => {
    const { state } = useContext(globalContext);
    
    return(
        <div className="HomePage">
            Home
        </div>
    );
}