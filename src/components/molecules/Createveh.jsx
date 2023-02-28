import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getRoutethunk } from '../../store/slices/dataTemp.slice';
import { getVehiclesThunk, postVehiclethunk } from '../../store/slices/vehicles.slice';

const Createveh = (props) => {

    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [listShowReplaceID, setListShowReplaceID] = useState(props.listshow.slice(1));

    const route = useSelector(state => state.temporary);
    const onSubmit = (data) => {
        alert("hice submit");
        console.log(data);
        dispatch(postVehiclethunk(data));
        reset();
        props.onHide();
    }

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='formModal' onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group className="mb-3">
                        <Form.Label>{listShowReplaceID[0]}</Form.Label>
                        <Form.Control  {...register(`${props.listdb[0]}`, { required: true })} />
                        <p className={`error-message ${errors[props.listdb[0]] ? 'showError' : ''}`}>Este campo es requerido</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{listShowReplaceID[1]}</Form.Label>
                        <Form.Control  {...register(`${props.listdb[1]}`, { required: true })} />
                        <p className={`error-message ${errors[props.listdb[1]] ? 'showError' : ''}`}>Este campo es requerido</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{listShowReplaceID[2]}</Form.Label>
                        <Form.Control
                            className="hide-number-arrows" type="number"
                            {...register(`${props.listdb[2]}`, { required: true, maxLength: 10 })}
                            inputMode="numeric"
                        />
                        <p className={`error-message ${errors[props.listdb[2]] ? 'showError' : ''}`}>
                            {`${errors[props.listdb[2].type] === 'maxLength' ? "Este campo es requerido" : "No puede ingresar mas de 10 digitos"}`}</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{listShowReplaceID[3]}</Form.Label>
                        <Form.Select {...register(`${props.listdb[3]}`, { required: true })}>
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                        </Form.Select>
                        <p className={`error-message ${errors[props.listdb[3]] ? 'showError' : ''}`}>Este campo es requerido</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{listShowReplaceID[4]}</Form.Label>
                        <Form.Select {...register(`${props.listdb[4]}`, { required: true })}>
                            {
                                route.map((rou, index) => (
                                    <option key={index} value={rou.id}>{rou.dia}</option>
                                ))
                            }
                        </Form.Select>
                        <p className={`error-message ${errors[props.listdb[4]] ? 'showError' : ''}`}>Este campo es requerido</p>
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={handleSubmit(onSubmit)}>                        Submit
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default Createveh;
{/* <form onSubmit={handleSubmit(onSubmit)}>
<input {...register("firstName", { required: true })} />
{errors.firstName && <span>Este campo es obligatorio</span>}
<button type="submit">Enviar</button>
</form> */}
{/* <Form className='formModal' onSubmit={handleSubmit(onSubmit)}>

    {

        listShowReplaceID.map((title, index) => (

            props.listdb[index] === "isActive" ?
                <Form.Group className="mb-3">
                    <Form.Label>{title}</Form.Label>
                    <Form.Select>
                        <option>Si</option>
                        <option>No</option>
                    </Form.Select>
                </Form.Group>
                : props.listdb[index] === "dia" ?
                    <Form.Group className="mb-3">
                        <Form.Label>{title}</Form.Label>
                        <Form.Select>
                            <option>sin_ruta</option>
                            <option>lunes</option>
                            <option>martes</option>
                            <option>miercoles</option>
                            <option>jueves</option>
                            <option>viernes</option>
                            <option>sabado</option>
                            <option>domingo</option>
                        </Form.Select>
                    </Form.Group> :
                    <Form.Group key={index} className="mb-3">
                        <Form.Label>{title}</Form.Label>
                        <Form.Control  {...register(`${props.listdb[index]}`, { required: true })} />
                    </Form.Group>
        ))

    }
    {errors.firstName && <span>Este campo es obligatorio</span>}
    <Button variant="primary" type="submit">
        Submit
    </Button>
</Form> */}