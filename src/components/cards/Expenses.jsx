import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


const Expenses = ({ codLiq, receptedExpenses, codeExpeLocalStorage, typeLiquidation }) => {


    const initialValueTransaccion = {
        settlement_code: codLiq,
        perdiem: '0',
        feeding: '0',
        fuel: '0',
        vehicle_expenses: "0",
        boat_expenses: "0",
        motorcycle_expenses: "0",
        total: "",
        detail: "OK"
    }


    /************** */
    const [typeIsSelected, setTypeIsSelected] = useState('');
    /************** */

    const expensesLocalStorage = JSON.parse(sessionStorage.getItem(codeExpeLocalStorage));

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        defaultValues: initialValueTransaccion
    });

    useEffect(() => {
        typeLiquidation === "vehicle" ? setTypeIsSelected(false) : setTypeIsSelected(true);

        setValue("settlement_code", codLiq);
        expensesLocalStorage ? setValue("feeding", expensesLocalStorage.feeding) : "0";
        expensesLocalStorage ? setValue("perdiem", expensesLocalStorage.perdiem) : "0";
        expensesLocalStorage ? setValue("fuel", expensesLocalStorage.fuel) : "0";
        expensesLocalStorage ? setValue("vehicle_expenses", expensesLocalStorage.vehicle_expenses) : "0";
        expensesLocalStorage ? setValue("boat_expenses", expensesLocalStorage.boat_expenses) : "0";
        expensesLocalStorage ? setValue("motorcycle_expenses", expensesLocalStorage.motorcycle_expenses) : "0";
        expensesLocalStorage ? setValue("total", expensesLocalStorage.total) : "0";
        expensesLocalStorage ? setTotal(expensesLocalStorage.total) : "0";
        expensesLocalStorage ? setValue("detail", expensesLocalStorage.detail) : "";
        console.log("cuantas veces ingresa");

    }, [codLiq])

    const [total, setTotal] = useState(0);
    const [formData, setFormData] = useState(new FormData());

    const calculateTotal = () => {
        let perdiem = parseFloat(formData.get('perdiem') || 0);
        let feeding = parseFloat(formData.get('feeding') || 0);
        let fuel = parseFloat(formData.get('fuel') || 0);
        let vehicle_expenses = parseFloat(formData.get('vehicle_expenses') || 0);
        let motorcycle_expenses = parseFloat(formData.get('motorcycle_expenses') || 0);
        let boat_expenses = parseFloat(formData.get('boat_expenses') || 0);

        const newTotal = feeding + fuel + vehicle_expenses + motorcycle_expenses + perdiem + boat_expenses;
        console.log(newTotal);
        setTotal(newTotal.toFixed(2));
        setValue("total", newTotal.toFixed(2))
    };

    const onChange =  (event) => {
        setValue("settlement_code", codLiq)
        const { name, value } = event.target;
        formData.set(name, value);
        setFormData(formData);
        calculateTotal();
    };


    const onSubmit = (data) => {
        setValue("settlement_code", codLiq)
        receptedExpenses(data);
        sessionStorage.setItem(codeExpeLocalStorage, JSON.stringify(data));
        handleClose();
    };

    const resetAction = () => {
        reset();
        setTotal(0);
        setFormData(new FormData());
        sessionStorage.removeItem(codeExpeLocalStorage);
    };

    const [showExpense, setShowExpense] = useState(false);

    const handleClose = () => setShowExpense(false);
    const handleShow = () => setShowExpense(true);
    return (

        <div>
            <Button variant="primary" onClick={handleShow} className='styleBtnModal' style={{ fontSize: "19px", fontWeight: "500" }}>
                <i class="fa-solid fa-hand-holding-dollar bx-fw"> </i>
                <h5>GASTOS</h5>
            </Button>

            <Modal show={showExpense} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Gastos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='' >
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

                                {/* Viaticos */}
                                <Form.Group className="mb-3" style={{ textAlign: "center" }}>
                                    <i className="fa-solid fa-car  bx-fw"></i>
                                    <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} > Viaticos</Form.Label>
                                    <Form.Control className='form-expense' placeholder='$'
                                        {...register('perdiem', { required: true, onChange: onChange, pattern: /^\d*\.?\d+$/ })} />
                                    <p className={`error-message ${errors["perdiem"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                    <p className={`error-message ${errors["perdiem"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                                </Form.Group>

                                {/* Alimentacion */}
                                <Form.Group className="mb-3" style={{ textAlign: "center" }}>
                                    <i className="fa-solid fa-utensils bx-fw"></i>
                                    <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} > Alimentacion</Form.Label>
                                    <Form.Control className='form-expense' placeholder='$'
                                        {...register('feeding', { required: true, onChange: onChange, pattern: /^\d*\.?\d+$/ })} />
                                    <p className={`error-message ${errors["feeding"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                    <p className={`error-message ${errors["feeding"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                                </Form.Group>

                                {/* Fuel */}
                                <Form.Group className="mb-3">
                                    <i className="fa-solid fa-gas-pump bx-fw"></i>
                                    <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} >Combustible</Form.Label>
                                    <Form.Control className='form-expense' placeholder='$'
                                        {...register("fuel", { required: true, onChange: onChange, pattern: /^\d*\.?\d+$/ })} />
                                    <p className={`error-message ${errors["fuel"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                    <p className={`error-message ${errors["fuel"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                                </Form.Group>

                                {/* expenses a vehicle */}
                                {
                                    typeIsSelected ? "" :
                                        <Form.Group className="mb-3">
                                            <i className="fa-solid fa-truck-fast bx-fw"></i>
                                            <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} >Gastos de Camion</Form.Label>
                                            <Form.Control placeholder='$' className='form-expense'
                                                {...register("vehicle_expenses", { required: true, onChange: onChange, pattern: /^\d*\.?\d+$/ })} />
                                            <p className={`error-message ${errors["vehicle_expenses"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                            <p className={`error-message ${errors["vehicle_expenses"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                                        </Form.Group>
                                }

                                {/* expenses a motorcycle */}
                                {
                                    typeIsSelected ? "" :
                                        <Form.Group className="mb-3">
                                            <i className="fa-solid fa-caravan bx-fw"></i>
                                            <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} >Gastos de Moto</Form.Label>
                                            <Form.Control className='form-expense' placeholder='$'
                                                {...register("motorcycle_expenses", { required: true, onChange: onChange, pattern: /^\d*\.?\d+$/ })}
                                            />
                                            <p className={`error-message ${errors["motorcycle_expenses"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                            <p className={`error-message ${errors["motorcycle_expenses"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                                        </Form.Group>
                                }

                                {/* expenses a Boat */}
                                {
                                    typeIsSelected ? "" :
                                        <Form.Group className="mb-3">
                                            {/* <i className="fa-solid fa-caravan bx-fw"></i> */}
                                            <i class="fa-solid fa-sailboat bx-fw"></i>
                                            <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} >Gastos de Lancha</Form.Label>
                                            <Form.Control className='form-expense' placeholder='$'
                                                {...register("boat_expenses", { required: true, onChange: onChange, pattern: /^\d*\.?\d+$/ })}
                                            />
                                            <p className={`error-message ${errors["boat_expenses"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                            <p className={`error-message ${errors["boat_expenses"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
                                        </Form.Group>
                                }

                                {/* total */}
                                <Form.Group className="mb-3">
                                    <i className="fa-brands fa-stack-overflow bx-fw"></i>
                                    <Form.Label style={{ fontSize: "12px", margin: "0.5rem 0" }} >Total de Gastos</Form.Label>
                                    <Form.Control value={total} placeholder='$' className='form-expense'
                                        {...register("total", { required: true, onChange: onChange, pattern: /^\d*\.?\d+$/ })}
                                    />
                                    <p className={`error-message ${errors["total"]?.type === "required" ? 'showError' : ''}`}>Campo requerido</p>
                                    <p className={`error-message ${errors["total"]?.type === "pattern" ? 'showError' : ''}`}>Solo se permite numeros</p>
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

                    <Button variant="outline-danger" onClick={() => { resetAction() }}>
                        Limpiar
                    </Button>
                    <Button variant="outline-success" type="submit" onClick={handleSubmit(onSubmit)}>
                        Grabar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Expenses;