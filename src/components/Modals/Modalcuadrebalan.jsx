import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useForm } from 'react-hook-form';
import date from '../../utils/date';
import Swal from 'sweetalert2';
import ModalInvoiceTransac from './ModalInvoiceTransac';
import { useDispatch } from 'react-redux';
import { postVehicleCuadrethunk } from '../../store/slices/vehicles.slice';
import { postSellCuadrethunk } from '../../store/slices/seller.slice';

const Modalcuadrebalan = ({ onHide, show, data, tipo }) => {

    const dispatch = useDispatch();

    const itemSelect = data;
    console.log(itemSelect);



    const cuadres = tipo === 'veh' ? itemSelect?.balance_veh?.cuadre_balance_vehs : itemSelect?.balance_sell?.cuadre_balance_sellers;

    const initialValueTransaccion = {
        id_balance: '',
        value: '',
        detail: ""
    }
    const { register, handleSubmit, reset, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: initialValueTransaccion
    });

    const [viewActualizarBal, setViewActualizarBal] = useState(false);
    const newCuadreBalance = () => {
        setValue('id_balance', tipo === 'veh' ? itemSelect?.balance_veh?.id : itemSelect?.balance_sell?.id);
        setViewActualizarBal(true);
    };

    const onSubmit = (item) => {
        item.value = parseFloat(item.value)
        Swal.fire({
            title: '¿Está seguro?',
            text: "¡No podrás revertir, ni eliminar esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Generar cuadre'
        }).then((result) => {
            if (result.isConfirmed) {
                if (item.id_balance === "" && item.value === "") {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error!',
                        text: 'DEBE LLENAR LOS CAMPOS NECESARIOS PARA GENERAR EL CUADRE',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    tipo === 'veh' ? dispatch(postVehicleCuadrethunk(item)) : dispatch(postSellCuadrethunk(item));
                    reset(initialValueTransaccion);
                    setViewActualizarBal(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Guardado!',
                        text: `Se a Generado el Cuadre de balance por el valor de  $ ${item.value}.  
                        Para ver los cambios se cerrara la ventana.`,
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#3085d6',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            onHide();
                        }
                    })
                }
            }
        });

    };

    return (
        <div>
            <Modal show={show} onHide={onHide} centered size="xl"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        CUADRE DE BALANCE
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
                        <h5>
                            {tipo === 'veh' ? "Vehiculo" : "Vendedor"}
                        </h5>
                        {
                            tipo === 'veh' ? (
                                <div style={{ display: "flex", gap: "1rem", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <span>Cod interno:</span>
                                        <h6>{itemSelect?.id}</h6>
                                    </div>
                                    <div>
                                        <span>Conductor:</span>
                                        <h6>{itemSelect?.driver}</h6>
                                    </div>
                                    <div>
                                        <span>Cedula O RUC:</span>
                                        <h6>{itemSelect?.dni}</h6>
                                    </div>
                                    <div>
                                        <span>Placa de Vehiculo:</span>
                                        <h6>{itemSelect?.enrollment}</h6>
                                    </div>
                                    <div>
                                        <span>Estado:</span>
                                        <h6>{itemSelect?.isActive === true ? "ACTIVO" : "INACTIVO"}</h6>
                                    </div>
                                    <div>
                                        <span>BALANCE:</span>
                                        <h6 style={{ fontSize: "25px", borderRadius: "8px", padding: "0.25rem" }} className={itemSelect?.balance_veh?.total > 0 ? "dateYellow" : (itemSelect?.balance_veh?.total < 0 ? "dateRed" : "dateGreen")} >
                                            $ {parseFloat(itemSelect?.balance_veh?.total).toFixed(2)}
                                        </h6>
                                        {/* <h6 style={{ fontSize: "25px" }}></h6> */}
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: "flex", gap: "1rem", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <span>Cod interno:</span>
                                        <h6>{itemSelect?.id}</h6>
                                    </div>
                                    <div>
                                        <span>Cod MovilVendor:</span>
                                        <h6>{itemSelect?.code}</h6>
                                    </div>
                                    <div>
                                        <span>Nombre:</span>
                                        <h6>{itemSelect?.name}</h6>
                                    </div>
                                    <div>
                                        <span>Ruta:</span>
                                        <h6>{itemSelect?.route?.name}</h6>
                                    </div>
                                    <div>
                                        <span>Estado:</span>
                                        <h6>{itemSelect?.isActive === true ? "ACTIVO" : "INACTIVO"}</h6>
                                    </div>
                                    <div>
                                        <span>BALANCE:</span>
                                        <h6 style={{ fontSize: "25px", borderRadius: "8px", padding: "0.25rem" }} className={itemSelect?.balance_veh?.total > 0 ? "dateYellow" : (itemSelect?.balance_veh?.total < 0 ? "dateRed" : "dateGreen")} >
                                            $ {parseFloat(itemSelect?.balance_sell?.total).toFixed(2)}
                                        </h6>
                                    </div>
                                </div>
                            )
                        }



                    </div>

                    <div style={{ height:"400px" , overflowY:"scroll", display: "flex", flexDirection: "column", margin: "1rem 0", padding: "1rem", borderTop: "2px solid var(--color6)", width: "100%" }}>
                        <h5>
                            Actualizacion de Balances Realizados
                        </h5>

                        <div style={{ display: "flex", gap: "1rem", flexDirection: "row", flexFlow: "row wrap", justifyContent: "space-around", alignItems: "stretch" }}>
                            {cuadres?.length > 0 ? null : "NINGUNA"}
                            {
                                cuadres?.map((trans, index) => (
                                    <div key={index} style={{
                                        border: `2px solid var(--${parseFloat(trans?.value).toFixed(2) < 0 ? 'color3' : 'color2'})`, borderRadius: "8px", padding: "0.5rem"
                                    }}>
                                        <span>#{index + 1}</span>
                                        <div style={{ display: "flex", width: "200px", flexFlow: "row wrap", justifyContent: "space-between" }} >
                                            <div>
                                                <span>Codigo Actualizacion</span>
                                                <h6>{trans?.id}</h6>
                                            </div>
                                            <div>
                                                <span>Fecha:</span>
                                                <h6>{date.convertirFechaUTCaLocal(trans?.createdAt)}</h6>
                                            </div>
                                            <div>
                                                <span>Valor:</span>
                                                <h6>$ {parseFloat(trans?.value).toFixed(2)}</h6>
                                            </div>
                                            <div style={{ borderTop: "2px solid var(--color6)", width: "100%" }}>
                                                <h6>Detalle:</h6>
                                                <span>{trans?.detail}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {
                        viewActualizarBal ?
                            (
                                <div style={{ display: "flex", flexDirection: "column", margin: "1rem 0", padding: "1rem", borderTop: "2px solid var(--color6)", width: "100%" }}>
                                    <h5>
                                        Actualizar Balance
                                    </h5>
                                    <div style={{ display: "flex", gap: "1rem", flexDirection: "row", flexFlow: "row wrap", justifyContent: "space-around", alignItems: "stretch" }}>
                                        <Form className='formModal' onSubmit={handleSubmit(onSubmit)}>

                                            {/* ID Balance */}
                                            <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                                                <Form.Label>Cod. Int Balance</Form.Label>
                                                <Form.Control style={{ width: "70px" }}  {...register('id_balance', { required: true })}
                                                    readOnly
                                                />
                                                <p className={`error-message ${errors["id_balance"] ? 'showError' : ''}`}>Campo requerido</p>
                                            </Form.Group>

                                            {/* Valor */}
                                            <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                                                <Form.Label>Valor $</Form.Label>
                                                <Form.Control style={{ width: "80px", borderColor: "red" }}
                                                    {...register("value", { required: true, pattern: /^[-]?\d*.?\d+$/ })}
                                                />
                                                <p className={`error-message ${errors["value"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                                <p className={`error-message ${errors["value"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                                            </Form.Group>

                                            {/* Detalle */}
                                            <Form.Group className="mb-3" style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                                                <Form.Label>Detalle de la Actualizacion</Form.Label>
                                                <Form.Control placeholder='Por que actualiza el Balance' style={{ width: "300px" }} {...register("detail", { required: true })}
                                                />
                                                <p className={`error-message ${errors["detail"] ? 'showError' : ''}`}>Campo requerido</p>
                                            </Form.Group>

                                            <Button variant="success" type="submit" onClick={handleSubmit(onSubmit)}>
                                                Generar
                                            </Button>
                                        </Form>
                                    </div>
                                    <div style={{textAlign:"center"}}>
                                        <h6>Nota: <span style={{fontWeight:"100"}}>Despues de creado no se puede eliminar.</span></h6>
                                        

                                    </div>
                                </div>
                            )
                            :
                            (null)
                    }

                </Modal.Body>
                <Modal.Footer>
                    {/*   <Button variant='info' onClick={editAction}>{editTransaction ? "Editar" : "Dejar de editar"}</Button>
                    <Button onClick={onHide}>Cerrar</Button>
                    <Button variant="warning" type="submit" onClick={resetPay}>
                        Cancelar Pago
                    </Button>*/}
                    <Button variant="success" type="submit" onClick={() => { newCuadreBalance() }}>
                        <i className="fa-solid fa-dollar-sign bx-fw"></i>
                        Cuadre
                    </Button>
                    <Button onClick={() => { onHide(); setViewActualizarBal(false); }}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Modalcuadrebalan;