import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import verify2 from "../../img/verificado.gif"
const Successful = (props) => {
    return (
        <div>
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='d-flex'
            >
                <Modal.Body>
                    <img style={{ maxWidth: "200px" }} src={verify2} alt="" />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Successful;