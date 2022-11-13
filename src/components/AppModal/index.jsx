import Modal from 'react-bootstrap/Modal';

const AppModal = ({children, showModal, setShowModal}) => {
    return (
        <Modal
            show={showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setShowModal(false)}
        >
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default AppModal;