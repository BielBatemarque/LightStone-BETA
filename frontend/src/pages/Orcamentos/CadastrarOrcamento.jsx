import { Title } from "../../components/Title";
import { FlexDiv, FundoForm, FundoTitle } from "../Clientes/styles";
import { Button } from "../../components/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

export const CadastrarOrcamento = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

                <FlexDiv>
                    <Button color={'gray'} action={handleShow}>Adicionar Peça</Button>
                </FlexDiv>
            </FundoForm>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova Peça</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
          <Button color="gray" action={handleClose}>
            Close
          </Button>
          <Button color="blue" action={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
            </Modal>
        </>
    );
}