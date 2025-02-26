import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DisplayModal({ setShow, onYes }) {
    function onYesClick(){
        setShow(false);
        onYes();
    }

    return (
        <Modal show={true} onHide={() => setShow(false) }>
            <Modal.Header closeButton>
                <Modal.Title>You are about to delete this...</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
            <Button variant="primary" onClick={onYesClick} >
                    Yes, Delete
            </Button>
            <Button variant="secondary" onClick={() => setShow(false)}>
                    No, don't
            </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default DisplayModal;