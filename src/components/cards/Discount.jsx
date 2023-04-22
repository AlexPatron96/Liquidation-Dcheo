import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Cash = ({ codLiq, receptedDiscount, codeDiscountLocalStorage, typeLiquidation }) => {

    const initialValueTransaccion = {
        settlement_code: codLiq,
        total_discount: '0',
        retention: '0',
        total_other: "",
        detail: "OK"
    };


    /************** */
    const [typeIsSelected, setTypeIsSelected] = useState('');
    /************** */

    const discountLocalStorage = JSON.parse(sessionStorage.getItem(codeDiscountLocalStorage));

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        defaultValues: initialValueTransaccion
    });

    useEffect(() => {
        typeLiquidation === "vehicle" ? setTypeIsSelected(false) : setTypeIsSelected(true);

        setValue("settlement_code", codLiq);
        discountLocalStorage ? setValue("total_discount", discountLocalStorage.total_discount) : "";
        discountLocalStorage ? setValue("retention", discountLocalStorage.retention) : "";
        discountLocalStorage ? setValue("total_other", discountLocalStorage.total_other) : "";
        discountLocalStorage ? setTotal(discountLocalStorage.total_other) : "";
        discountLocalStorage ? setValue("detail", discountLocalStorage.detail) : "";
        console.log("cuantas veces ingresa");

    }, [codLiq])

    const [total, setTotal] = useState(0);
    const [formData, setFormData] = useState(new FormData());

    const calculateTotal = () => {
        let total_discount = parseFloat(formData.get('total_discount') || 0);
        let retention = parseFloat(formData.get('retention') || 0);
        // console.log(motorcycle_expenses);

        const newTotal = total_discount + retention;
        setTotal(newTotal.toFixed(2));
        setValue("total_other", newTotal.toFixed(2))
    };

    const onChange = (event) => {
        setValue("settlement_code", codLiq)
        const { name, value } = event.target;
        formData.set(name, value);
        // console.log(formData);
        setFormData(formData);
        calculateTotal();
    };


    const onSubmit = (data) => {
        // console.log(data);
        setValue("settlement_code", codLiq)
        receptedDiscount(data);
        sessionStorage.setItem(codeDiscountLocalStorage, JSON.stringify(data));
        handleClose();
    };

    const resetAction = () => {
        reset();
        setFormData(new FormData());
        sessionStorage.removeItem(codeDiscountLocalStorage);
    };

    const [showDiscount, setShowDiscount] = useState(false);

    const handleClose = () => setShowDiscount(false);
    const handleShow = () => setShowDiscount(true);
    return (

        <div>

            <Button variant="primary" onClick={handleShow} className='styleBtnModal' style={{ fontSize: "19px", fontWeight: "500" }}>
                <i className="fa-solid fa-tags bx-fx"></i>
                DESCUENTOS
            </Button>

            <Modal show={showDiscount} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Descuentos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=''>
                        <h5></h5>
                        <div>
                            <Form className='formModal' style={{ justifyContent: "space-between" }} onSubmit={handleSubmit(onSubmit)}>

                                {/* Codigo de factura*/}
                                <Form.Group className="mb-3" style={{ textAlign: "center" }}>
                                    <i className="fa-solid fa-file-invoice bx-fw"></i>
                                    <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }}># Liquidacion</Form.Label>
                                    <Form.Control readOnly placeholder='LIQ-SELL-M1-day'
                                        style={{ width: "175px", fontSize: "12px", margin: "0 auto", padding: "0.5rem" }}
                                        {...register('settlement_code')} />
                                    <p className={`error-message ${errors["settlement_code"] ? 'showError' : ''}`}>Campo requerido</p>
                                </Form.Group>

                                {/* Descuentos */}
                                <Form.Group className="mb-3" style={{ textAlign: "center" }}>
                                    <i className="fa-solid fa-tags bx-fw"></i>
                                    <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} >Descuento </Form.Label>
                                    <Form.Control className='form-discount' placeholder='$'
                                        {...register('total_discount', { required: true, onChange: onChange, pattern: /^[-]?\d*.?\d+$/ })} />
                                    <p className={`error-message ${errors["total_discount"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                    <p className={`error-message ${errors["total_discount"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                                </Form.Group>


                                {/* Retenciones */}
                                <Form.Group className="mb-3" style={{ textAlign: "center" }}>
                                    <i className="fa-solid fa-retweet bx-fw"></i>
                                    <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} >Retenciones</Form.Label>
                                    <Form.Control className='form-discount' placeholder='$'
                                        {...register('retention', { required: true, onChange: onChange, pattern: /^[-]?\d*.?\d+$/ })} />
                                    <p className={`error-message ${errors["retention"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                    <p className={`error-message ${errors["retention"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                                </Form.Group>

                                {/* total */}
                                <Form.Group className="mb-3">
                                    <i className="fa-brands fa-stack-overflow bx-fw"></i>
                                    <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} >Total de Descuentos</Form.Label>
                                    <Form.Control value={total} placeholder='$' className='form-discount'
                                        {...register("total_other", { required: true, onChange: onChange, pattern: /^[-]?\d*.?\d+$/ })}
                                    />
                                    <p className={`error-message ${errors["total_other"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                    <p className={`error-message ${errors["total_other"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                                </Form.Group>

                                {/* Detalle adicional */}
                                <Form.Group className="mb-3">
                                    <i className="fa-solid fa-circle-info bx-fw"></i>
                                    <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} >Detalles adicionales</Form.Label>
                                    <Form.Control
                                        style={{ width: "175px", fontSize: "12px", margin: "0 auto", padding: "0.5rem" }}
                                        {...register("detail")}
                                    />
                                </Form.Group>
                                {/* <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Button style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} variant="outline-danger" onClick={() => { reset() }}>
                                        Limpiar
                                    </Button>
                                    <Button style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }} variant="outline-success" type="submit" onClick={handleSubmit(onSubmit)}>
                                        Grabar
                                    </Button>
                                </div> */}

                            </Form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="outline-danger" onClick={() => { resetAction(); }}>
                        Limpiar
                    </Button>
                    <Button style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }} variant="outline-success" type="submit" onClick={handleSubmit(onSubmit)}>
                        Grabar
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Cash;