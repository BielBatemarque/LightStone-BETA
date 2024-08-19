import { Title } from "../../components/Title";
import { FlexDiv, FundoForm, FundoTitle } from "../Clientes/styles";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { FloatLabel } from '../../components/FloatLabel/index';
import { FormLinePecas } from './styles';
import { StyledSelect } from '../../pages/Materiais/styles';
import { useAuth } from '../../hooks/useAuth';
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { FaTrash } from 'react-icons/fa';

export const CadastrarOrcamento = () => {
    const [addPc, setAddpc] = useState(false);
    const [peca, setPeca] = useState({});
    const [materiais, setMateriais] = useState([]);
    const { state } = useAuth();
    const [listaPecasOrcamento, setListaPecasOrcamento] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [orcamento, setOrcamento] = useState({});

    const handleButtonClick = () => {
        setAddpc(prevState => !prevState);
    };

    const handlChangePc = (e) => {
        const { name, value } = e.target;
        setPeca({...peca,[name]:value});
    };

    const handleChangeOrcamento = (e) => {
        const {name, value} = e.target;
        setOrcamento({...orcamento, [name]: value});
    }

    const handleLoadMateriais = async () => {
        const request = await fetch('http://localhost:8000/materiais/');
        const response = await request.json();

        setMateriais(response);
    };

    const handleLoadClientes = async () => {
        const request = await fetch('http://localhost:8000/clientes/');
        const response = await request.json();

        setClientes(response);
    } 

    const handleCadastraPeca = async () => {

        const materiais = await fetch('http://localhost:8000/materiais/');
        const materiaisList = await materiais.json();

        console.log('materiais:', materiaisList,'peca:', peca);

        const request = await fetch('http://localhost:8000/pecas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Token ${state.token}`
            },
            body: JSON.stringify(peca),
        });

        const response = await request.json();

        if (request.ok){
            try{
                setListaPecasOrcamento(prevLista => [...prevLista, response]);
                SucssesNotifications('Peça Adicionada com sucesso.')
                
            }catch(erro){
                FailNotifications('Não foi possivel adicionar a peça.')
            }
        }
    }

    useEffect(() => {
        handleLoadMateriais();
    }, [addPc]);

    useEffect(() => {
        handleLoadClientes();
    }, []);

    const removePecaOrcamento = (pecaToRemove) => {
        setListaPecasOrcamento(prevLista => 
            prevLista.filter(peca => peca.id !== pecaToRemove.id)
        );

        SucssesNotifications('Peça removida com sucesso.');
    }


    const handleCadastraOrcamento = async () => {
        const pecasIds = listaPecasOrcamento.map(peca => peca.id);
        const orcamentoComPecas = {
            ...orcamento,
            pecas: pecasIds
        };

        const request = await fetch('http://localhost:8000/orcamentos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Token ${state.token}`
            },
            body: JSON.stringify(orcamentoComPecas),  // Envia o orcamento com a lista de IDs
        });
        console.log(orcamentoComPecas);

        if (request.ok) {
            SucssesNotifications('Orçamento cadastrado com sucesso.');
        } else {
            FailNotifications('Não foi possível cadastrar o orçamento.');
        }
    }

    return(
        <>
            <FundoTitle>
                <Title mt={'0px'}>Novo Orçamento</Title>
            </FundoTitle>
            <FundoForm>
                <h2 style={{
                    margin: '0px',
                    textAlign: 'center',
                }}>Lista de Peças:</h2>


                {/* listagem das peças aqui => quantidade - nome - valor */}


                { listaPecasOrcamento.length >= 1 ? 
                    listaPecasOrcamento.map((peca, index) => (
                        <p key={index} style={{textAlign: 'center'}}>
                            {peca.nome} - 
                            <FaTrash 
                                onClick={() => removePecaOrcamento(peca)} 
                                style={{ cursor: 'pointer', color: 'red' }}
                            />
                        </p>
                    )) : null
                }

                <FlexDiv>
                    <Button color={'gray'} action={handleButtonClick}>Adicionar Peça</Button>
                </FlexDiv>  

                <br />
                

                { addPc ?
                <FormLinePecas>
                    <FloatLabel size={20} text={'Nome'} name={'nome'} onChange={handlChangePc}/> 
                    <FloatLabel size={20} text="Descrição" name={'descrição'} onChange={handlChangePc}/>
                    <FloatLabel size={20} text="Quantidade de m2" name={'quantidade_metros'} onChange={handlChangePc}/>
                    <StyledSelect name="material" onChange={handlChangePc}>
                        {materiais.map((mat, index) => (
                            <option key={index} value={mat.id}>{mat.nome}</option>
                        ))}
                    </StyledSelect>
                    <Button action={handleCadastraPeca}>Confirmar</Button>
                </FormLinePecas>
                 : null}
                    <br />
                <FlexDiv>
                    <StyledSelect name="cliente" onChange={handleChangeOrcamento}>
                        {clientes.map((cliente, index) => (
                            <option key={index} value={cliente.id}>{cliente.nome}</option>
                        ))}
                    </StyledSelect>
                </FlexDiv>

                <FlexDiv>
                    <FloatLabel name={'valor_total'} text={'Valor total'}  type={'text'} onChange={handleChangeOrcamento}/>
                </FlexDiv>

                <FlexDiv>
                    <Button action={handleCadastraOrcamento}>Salvar Orçamento</Button>
                </FlexDiv>
            </FundoForm>
        </>
    );
}