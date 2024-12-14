import { CiFilter } from "react-icons/ci";
import { Flex } from './styled';
import { useState } from "react";

export const ListFilter = ({ action }) => {
    const [valor, setValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            action(valor); // Aciona a ação ao pressionar Enter
        }
    };

    return (
        <Flex>
            <input 
                value={valor} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="Digite para filtrar..." 
                onKeyDown={handleKeyDown} // Substitui onKeyPress por onKeyDown
            />
            <button onClick={() => action(valor)}>
                <CiFilter size={20} />
            </button>
        </Flex>
    );
};
