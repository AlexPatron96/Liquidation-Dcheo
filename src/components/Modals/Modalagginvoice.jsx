import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../layout/LoadingScreen';
import { setPagination } from '../../store/slices/pagination.slice';
import Paginationdesign from '../Paginationdesign';
import Buttonatom from '../atom/Buttonatom';
import Functionalitiesbtn from '../atom/Functionalitiesbtn';
import { getInvoiceThunk, setInvoice } from '../../store/slices/invoice.slice';

const Modalagginvoice = ({ data, showAggInvoice, setShowAggInvoice, aggInvoice }) => {

    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false)
    const invoiceSaldo = data.filter((veh) => { return (veh.balance > 0) });
    console.log(invoiceSaldo);
    useEffect(() => {
        dispatch(setInvoice(invoiceSaldo));
        // dispatch(getInvoiceThunk());
        setRefresh(false);
    }, [refresh])

    const pagination = useSelector(state => state.pagination);
    const loading = useSelector(state => state.isLoading);

    const btnReset = () => {
        return (
            <>
                <Buttonatom created={(() => setRefresh(true))}
                    title={"Actualizar"}
                    color={"info"} ico={"fa-sync fa-spin"} />
            </>
        )
    }

    const search = (data) => {
        const filteredList = invoiceSaldo.filter((item) => (
            (item.client.fullname).toLowerCase().includes(data.toLowerCase()) ||
            (item.client.dni).includes(data) || (item.num_bill).includes(data) ||
            (item.deliver_date).includes(data) || (item.seller.name).toLowerCase().includes(data.toLowerCase())
        ));
        dispatch(setPagination(filteredList));
        console.log(filteredList);
    }
    const handleClose = () => setShowAggInvoice(false);
    // const handleShow = () => setShowAggInvoice(true);
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [checkSelectedID, setCheckSelectedID] = useState([]);

    const selectInvoice = () => {
        aggInvoice(selectedInvoices);
        setSelectedInvoices([]);
        setCheckSelectedID([]);
    }
    const handleAddInvoice = (e, item) => {
        const { checked, value, name } = e.target;
        if (checked) {
            setSelectedInvoices([...selectedInvoices, item]);
            setCheckSelectedID(prevState => [...prevState, value]);
        } else {
            setSelectedInvoices(
                selectedInvoices.filter((selectedItem) => selectedItem.id !== item.id)
            );
            setCheckSelectedID(
                checkSelectedID.filter((selectedItem) => (selectedItem).toString() !== (item.id).toString())
            );
        }
    };
    return (
        <div>
            <Modal show={showAggInvoice} onHide={handleClose} centered size="lg"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>Anadir Facturas para liquidar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Functionalitiesbtn
                            buttons={btnReset}
                            search={search} />
                    </div>
                    <div className="table-container" style={{ height: "350px" }} >
                        <Table striped bordered hover style={{ width: "740px", fontSize: "12px", textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "30px" }}>-</th>
                                    <th style={{ width: "30px" }}>#</th>
                                    <th style={{ width: "40px" }}>ID</th>
                                    <th style={{ width: "170px" }}>Cliente</th>
                                    <th style={{ width: "110px" }}># Factura</th>
                                    <th style={{ width: "50px" }}>Estatus</th>
                                    <th style={{ width: "70px" }}>Total</th>
                                    <th style={{ width: "70px" }}>Saldo</th>
                                    <th style={{ width: "80px" }}>Vendedor</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    pagination.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>
                                                <input type="checkbox"
                                                    name='id_select'
                                                    value={item.id}
                                                    checked={(checkSelectedID.includes((item.id).toString()))}
                                                    onChange={(e) => handleAddInvoice(e, item)} />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.client?.fullname}</td>
                                            <td>{item.num_bill}</td>
                                            <td>{item.id_status}</td>
                                            <td><h5 style={{ fontSize: "11px" }}>$ {item.total_bill}</h5></td>
                                            <td style={{ fontSize: "11px" }}>$ {item.balance}</td>
                                            <td>{item.seller?.name}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table>

                    </div>
                    {!loading ? <Paginationdesign
                        data={"invoice"}
                    />
                        : <LoadingScreen />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleClose} >
                        {/* disabled={(selectedInvoices).length > 0 ? true : false} */}
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => selectInvoice()}>
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Modalagginvoice;