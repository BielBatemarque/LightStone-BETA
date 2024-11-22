import { CiFilter } from "react-icons/ci";
import { Flex } from './styled';
import { useState } from "react";

export const ListFilter = ({ action }) => {
    const [valor, setValue] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            action(valor);
        }
    };

    return (
        <Flex>
            <input 
                value={valor} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="Digite para filtrar..." 
                onKeyPress={handleKeyPress}
            />
            <button onClick={() => action(valor)}>
                <CiFilter size={20} />
            </button>
        </Flex>
    );
};