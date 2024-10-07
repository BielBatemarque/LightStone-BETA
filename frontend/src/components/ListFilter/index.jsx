import { CiFilter } from "react-icons/ci";
import { Flex } from './styled';
import { useState } from "react";
 
export const ListFilter = ({ action }) => {
    const [valor, setValue] = useState("");
    
    return (
        <Flex>
            <input value={valor} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={() => action(valor)}> <CiFilter/> </button>
        </Flex>
    );
}