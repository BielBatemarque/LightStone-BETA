import { useContext, useEffect, useState } from "react";
import { ButtonContainer, ModalContainer, Overlay } from "./styles";
import { globalContext } from "../../context/context";
import { FailNotifications, SucssesNotifications } from "../Notifications";

export const CadastrarOrcamentoModal = ({ isOpen, onClose }) => {
    const [clientes, setClientes] = useState([]);
    const [orcamento, setOrcamento] = useState({
        valor_total: null,
        cliente: null,
        pecas: [],
      });
      const [materiais, setMateriais] = useState([]);
      const [peca, setPeca] = useState({});
      const { state } = useContext(globalContext);

      const handleCarregaClientes = async () => {
        const request = await fetch('http://localhost:8000/clientes/');
        const response = await request.json();

        setClientes(response);
      }

      useEffect(() => {
        handleCarregaClientes();
        handleLoadMateriais();
      }, []);

      const handleLoadMateriais = async () => {
        const request = await fetch('http://localhost:8000/materiais/');
        const response = await request.json();

        setMateriais(response);
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrcamento((prevData) => ({ ...prevData, [name]: value }));
      };

    const handleChangePeca = (e) => {
        const { name, value } = e.target;

        setPeca({ ...peca, [name]: value });
    }
    
    const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    };

    if (!isOpen) return null;

    const handleSalvarPeca = async () => {
        const request = await fetch('http://localhost:8000/pecas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
            body: JSON.stringify(peca),
        });

        if (request.ok){
            SucssesNotifications('Peça adicionada ao Orçamento.');

        } else {
            FailNotifications('Não foi possivel adicionar a peça ao orçamento.');
        }
    } 

    return (
        <Overlay>
            <ModalContainer>
                <h2>Novo Orçamento</h2>

                {/* Formulario do Orcamento */}
                <form action="">

                    <label>
                        Selecione o cliente:
                        <select>
                            {clientes.map((cliente, index) => (
                                <option key={index} value={cliente.id}>{cliente.nome}</option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor="">
                        Valor total do Orçamento:
                        <input type="number" name="valor_total" />
                    </label>

                    <ButtonContainer>
                        <button type="button" onClick={onClose}>Cancelar</button>
                        <button type="submit">Salvar</button>
                    </ButtonContainer>
                </form>

                {/* Formulário para cadastrar as peças do orçamento */}
                <form onSubmit={handleSalvarPeca}>
                    <label htmlFor="">
                        Nome da peça:
                        <input type="text" name="nome" onChange={handleChangePeca}/>
                    </label>
                    <label htmlFor="">
                        Descrição: 
                        <input type="text" name="descricao" onChange={handleChangePeca} />
                    </label>

                    <label htmlFor="">
                        Quantidade de M²:
                        <input type="number" name="quantidade_metros" onChange={handleChangePeca}/>
                    </label>

                    <label htmlFor="">
                        Material:
                        <select name="material" onChange={handleChangePeca}>
                            {materiais.map((material, index) => (
                                <option key={index} value={material.id}>{material.nome}</option>
                            ))}
                        </select>
                    </label>
                    
                    <ButtonContainer>

                        <button type="submit">Incluir Peça</button>
                    </ButtonContainer>
                </form>
            </ModalContainer>
        </Overlay>
    );
}