import { CiFilter } from "react-icons/ci";
import { Flex } from './styled';
import { useState } from "react";
 
export const ListFilter = ({ url, campo_pesquisa }) => {
    const [valor, setValue] = useState("");
    console.log(valor);

    const handleFilter = async (url_link, ) => {
        const request = await fetch(url_link)
    }

    return (
        <Flex>
            <input value={valor} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={() => handleFilter(url)}> <CiFilter/> </button>
        </Flex>
    );
}