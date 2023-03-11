import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Modalagginvoice = ({ data, showAggInvoice, setShowAggInvoice }) => {
    // const [show, setShow] = useState(false);

    const handleClose = () => setShowAggInvoice(false);
    const handleShow = () => setShowAggInvoice(true);


    return (
        <div>
            <Modal show={showAggInvoice} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                    </div>
                    <div>
                        <Table striped bordered hover style={{ maxWidth: "1305px", fontSize: "12px", textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th style={{ maxWidth: "50px" }}>select</th>
                                    <th style={{ maxWidth: "50px" }}>ID</th>
                                    <th style={{ maxWidth: "185px" }}>Cliente</th>
                                    <th style={{ maxWidth: "150px" }}># Factura</th>
                                    <th style={{ maxWidth: "150px" }}>Estatus</th>
                                    <th style={{ maxWidth: "125px" }}>Total</th>
                                    <th style={{ maxWidth: "125px" }}>Saldo</th>
                                    <th style={{ maxWidth: "175px" }}>Vendedor</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td>
                                        a
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Modalagginvoice;