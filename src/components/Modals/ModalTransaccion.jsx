import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useForm } from 'react-hook-form';
import date from '../../utils/date';
import Swal from 'sweetalert2';

const ModalTransaccion = ({ onHide, user, data, datatransac, show, transactionfun }) => {

    const userLiquidator = user;
    const itemSelect = data;
    const datatransaction = datatransac;
    const initialValueTransaccion = {
        id_bill: '',
        num_bill: '',
        balance_date: date.Currendate(),
        pay: 0,
        id_user: "liquidador"
    }
    const { register, handleSubmit, reset, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: initialValueTransaccion
    });


    const payIfItExists = () => {
        const validador = datatransaction.filter((valid) => valid.id_bill === itemSelect.id)
        validador[0] ? setValue('id_bill', validador?.[0].id_bill) : setValue('id_bill', itemSelect.id);
        validador[0] ? setValue('num_bill', validador?.[0].num_bill) : setValue('num_bill', itemSelect.num_bill);
        validador[0] ? setValue('pay', validador?.[0].pay) : setValue('pay', 0);
        setValue('id_user', userLiquidator)
    }

    useEffect(() => {
        payIfItExists();
    }, [show])

    const resetPay = () => {
        let values = getValues();
        values.pay = 0;
        transactionfun(values);
        reset();
        onHide();
    };

    const onSubmit = (data) => {
        if (data.pay > itemSelect.balance || data.pay <= 0) {
            console.log("El pago es mayo o menor que el de la factura");
            Swal.fire({
                icon: 'warning',
                title: 'Error!',
                text: 'No puedes realizar pagos mayores al adeudado o en Cero',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            // console.log("abono o pago correcto");
            // Swal.fire({
            //     title: '¿Está seguro?',
            //     text: "Deseas Guardar transaccion realizada",
            //     icon: 'question',
            //     showCancelButton: true,
            //     confirmButtonColor: '#029C63',
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'Si, Guardar!',
            //     reverseButtons: true
            // }).then((result) => {
            //     if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Guardado!',
                text: `Se a guardado el Pago de $ ${data.pay}!`,
                showConfirmButton: false,
                timer: 1000
            })
            transactionfun(data);
            // console.log(data);
            reset(initialValueTransaccion)
            onHide();
            // } else {
            //     Swal.fire({
            //         icon: 'warning',
            //         title: 'Cancelado!',
            //         text: 'Se a cancelado el registro',
            //         showConfirmButton: false,
            //         timer: 1000
            //     })
            //     reset(initialValueTransaccion)
            //     onHide();
            // }
            // })
        }
    }

    const [editTransaction, setEditTrans] = useState(true);

    const editAction = () => {
        editTransaction ? setEditTrans(false) : setEditTrans(true);
    };
    return (
        <div>
            <Modal show={show} onHide={onHide} centered size="lg"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Transaccion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
                        <h5>Realize el pago total o abono</h5>
                        <span style={{ fontSize: "13px" }}>Cliente:{" "}
                            {itemSelect ? itemSelect?.client?.fullname : ""}</span>
                        <span style={{ fontSize: "14px" }}>Saldo Anterior: $
                            {itemSelect ? itemSelect?.balance : ""}</span>
                    </div>


                    <Form className='formModal' onSubmit={handleSubmit(onSubmit)}>

                        {/* Identificador de Factura */}
                        <Form.Group className="mb-3">
                            <Form.Label>Id Factura</Form.Label>
                            <Form.Control style={{ width: "70px" }}  {...register('id_bill', { required: true })}
                                readOnly={editTransaction}
                            />
                            <p className={`error-message ${errors["id_bill"] ? 'showError' : ''}`}>Campo requerido</p>
                        </Form.Group>

                        {/* Numero de Factura */}
                        <Form.Group className="mb-3">
                            <Form.Label># Factura</Form.Label>
                            <Form.Control style={{ width: "190px" }} {...register('num_bill', { required: true })}
                                readOnly={editTransaction} />
                            <p className={`error-message ${errors["num_bill"] ? 'showError' : ''}`}>Campo requerido</p>
                        </Form.Group>

                        {/* Fecha de la transaccion*/}
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha De Transaccion</Form.Label>
                            <Form.Control type="date" {...register("balance_date", { required: true })} />
                            <p className={`error-message ${errors["balance_date"] ? 'showError' : ''}`}>Campo requerido</p>
                        </Form.Group>

                        {/* Valor */}
                        <Form.Group className="mb-3">
                            <Form.Label>Valor $</Form.Label>

                            <Form.Control style={{ width: "80px", borderColor: "red" }}
                                {...register("pay", { required: true, pattern: /^\d*\.?\d+$/ })}
                            />


                            <p className={`error-message ${errors["pay"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                            <p className={`error-message ${errors["pay"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                        </Form.Group>


                        {/* Usuario */}
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control style={{ width: "80px" }} {...register("id_user", { required: true })}
                                readOnly={editTransaction} />
                            <p className={`error-message ${errors["id_user"] ? 'showError' : ''}`}>Campo requerido</p>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => { setValue("pay", 10) }}
                            style={{ fontSize: "10px", width: "50px", border: "2px solid red", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }} >
                            PAGAR $10
                        </button>
                        <button onClick={() => { setValue("pay", 20) }}
                            style={{ fontSize: "10px", width: "50px", border: "2px solid red" }} >
                            PAGAR $20
                        </button>
                        <button onClick={() => { setValue("pay", itemSelect?.balance) }}
                            style={{ fontSize: "10px", width: "50px", border: "2px solid red", borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }} >
                            PAGAR TODO
                        </button>
                    </div>
                    <Button variant='info' onClick={editAction}>{editTransaction ? "Editar" : "Dejar de editar"}</Button>
                    <Button onClick={onHide}>Cerrar</Button>
                    <Button variant="warning" type="submit" onClick={resetPay}>
                        Cancelar Pago
                    </Button>
                    <Button variant="success" type="submit" onClick={handleSubmit(onSubmit)}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalTransaccion;