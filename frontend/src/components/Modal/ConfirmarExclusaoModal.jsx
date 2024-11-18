import { ModalContainer, Overlay } from "./styles";

export const ConfirmarExclusaoModal = ({ mensagem, onConfirm, onCancel }) => {
    return (
        <Overlay>
            <ModalContainer>
                <h2>{mensagem || "Confirma Exclusão!"}</h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <button onClick={onConfirm} style={{ background: "#4caf50", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", marginRight: "10px", cursor: 'pointer' }}>
                        Confirmar
                    </button>
                    <button onClick={onCancel} style={{ background: "#f44336", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: 'pointer' }}>
                        Cancelar
                    </button>
                </div>
            </ModalContainer>
        </Overlay>
    );
};