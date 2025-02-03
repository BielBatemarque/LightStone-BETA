import { useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { Cliente } from "../../models/Cliente";
import { globalContext } from "../../context/context";
import { AtentionNotification, FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import { FlexRow, FundoForm, FundoTitle, StyledForm, FlexDiv } from "./styles";
import { FloatLabel } from "../../components/FloatLabel";

export const CadastrarCLientePage = () => {
    const [cliente, setCliente] = useState(new Cliente());
    const { state } = useContext(globalContext);
    const [cep, SetCep] = useState("");
    const [endereco, setEndereco] = useState({});
    const [documentoValido, setDocumentoValido] = useState(true);
    const [cpf, setCPF] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleCadastraCliente = async (e) => {
        e.preventDefault();

        if (!documentoValido) {
            AtentionNotification("Documento inválido. Verifique o CPF.");
            return;
        }

        try {
            const request = await fetch("http://localhost:8000/clientes/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${state.token}`,
                },
                body: JSON.stringify(cliente),
            });

            const response = await request.json();

            if (request.ok) {
                SucssesNotifications("Cadastrado com Sucesso");
                navigate("/Clientes/");
            } else {
                FailNotifications(
                    "Erro ao cadastrar: " + (response.error || "Erro desconhecido")
                );
            }
        } catch (error) {
            FailNotifications("Erro ao cadastrar: " + error.message);
        }
    };

    const validaCPF = async (cpf) => {
        try {
            const request = await fetch("http://localhost:8000/valida_cpf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cpf }),
            });

            const response = await request.json();

            if (request.status === 200) {
                setCliente({ ...cliente, cpf });
                setDocumentoValido(true);
                SucssesNotifications(response.message);
            } else if (request.status === 400) {
                AtentionNotification(response.error);
                setDocumentoValido(false);
            }
        } catch {
            setDocumentoValido(false);
        }
    };

    const formataCep = (cep) => cep.replace(/\D/g, "");

    const consultaCep = async (cep) => {
        try {
            const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const response = await request.json();

            setEndereco(response);

            setCliente({
                ...cliente,
                cep,
                cidade: response.localidade || cliente.cidade,
                uf: response.uf || cliente.uf,
                logradouro: response.logradouro || cliente.logradouro,
                bairro: response.bairro || cliente.bairro,
            });
        } catch {}
    };

    return (
        <>
            <FundoTitle>
                <Title mt={0}>Cadastrar Cliente</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm onSubmit={handleCadastraCliente}>
                    <FlexRow>
                        <FloatLabel
                            type="text"
                            name="nome"
                            onChange={handleChange}
                            text="Nome"
                            size={45}
                        />
                        <FloatLabel
                            type="text"
                            name="cpf"
                            onChange={(e) => setCPF(e.target.value)}
                            text="CPF"
                            onBlur={() => validaCPF(cpf)}
                            size={45}
                        />
                    </FlexRow>
                    <FlexRow>
                        <FloatLabel
                            text="CEP"
                            name="cep"
                            size={45}
                            onChange={(e) => SetCep(formataCep(e.target.value))}
                            onBlur={() => consultaCep(cep)}
                        />
                        <FloatLabel
                            text="Bairro"
                            size={45}
                            value={endereco.bairro}
                            name="bairro"
                            onChange={handleChange}
                        />
                    </FlexRow>
                    <FlexRow>
                        <FloatLabel
                            text="Cidade"
                            size={45}
                            value={endereco.localidade}
                            name="cidade"
                            onChange={handleChange}
                        />
                        <FloatLabel
                            text="UF"
                            size={45}
                            value={endereco.uf}
                            name="uf"
                            onChange={handleChange}
                        />
                    </FlexRow>
                    <FlexRow>
                        <FloatLabel
                            text="Logradouro"
                            size={45}
                            value={endereco.logradouro}
                            name="logradouro"
                            onChange={handleChange}
                        />
                        <FloatLabel
                            text="Número"
                            size={45}
                            name="numero"
                            onChange={handleChange}
                        />
                    </FlexRow>
                    <FlexRow>
                        <FloatLabel
                            type="email"
                            name="email"
                            onChange={handleChange}
                            text="Email"
                            size={45}
                        />
                        <FloatLabel
                            type="date"
                            name="data_nascimento"
                            onChange={handleChange}
                            text="Data de Nascimento"
                            size={45}
                        />
                    </FlexRow>

                    <FlexRow>
                        <FloatLabel
                            type="text"
                            name="telefone"
                            onChange={handleChange}
                            text="Nº Telefone"
                            size={45}
                        />
                    </FlexRow>
                    <FlexDiv>
                        <Button>Cadastrar</Button>
                        <Button color="red" action={() => navigate("/Clientes/")}>
                            Cancelar
                        </Button>
                    </FlexDiv>
                </StyledForm>
            </FundoForm>
        </>
    );
    
};
