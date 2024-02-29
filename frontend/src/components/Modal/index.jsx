import { useState } from "react";
import { ModalDiv } from "./styles";
import Modal from 'react-modal';

Modal.setAppElement('#root');
export const ModalComponent = ({text, isOpen}) => {
    const [modasIsOpen, setModalIsOpen] = useState(false);
    
    const openModal= () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    return(
        <Modal
            isOpen={modasIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            overlayClassName='modal-overlay'
            className='modal-content'
        >
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis incidunt itaque officiis numquam dolorem! Nobis fugit repellat illum rem consectetur quae, harum omnis similique quaerat! Fuga excepturi est facere cupiditate!</p>

            <button onClick={closeModal}>fecha modal</button>
        </Modal>
    );
}