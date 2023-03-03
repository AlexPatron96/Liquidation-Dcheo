import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { getRoutethunk, newRoutethunk } from '../../store/slices/dataTemp.slice';
import { useDispatch } from 'react-redux';
import Successful from '../atom/Successful';


const Createdroute = (props) => {
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [listShowReplaceID, setListShowReplaceID] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        setListShowReplaceID(props.listshow?.slice(1));
        if (showSuccessModal) {
            setTimeout(() => {
                setShowSuccessModal(false);
            }, 1750);
        }
    }, [showSuccessModal]);

    const onSubmit = (data) => {
        alert("hice submit");
        console.log(data);
        dispatch(newRoutethunk(data));
        dispatch(getRoutethunk());
        reset();
        props.onHide();
        setShowSuccessModal(true);
        // funcionCreated();
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Created Route
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='formModal' onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>{props.listshow[0]}</Form.Label>
                            <Form.Select {...register(`${props.listdb[0]}`, { required: true })} >
                                <option>sin_ruta</option>
                                <option>lunes</option>
                                <option>martes</option>
                                <option>miercoles</option>
                                <option>jueves</option>
                                <option>viernes</option>
                                <option>sabado</option>
                                <option>domingo</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{props.listshow[1]}</Form.Label>
                            <Form.Control
                                placeholder="Ingrese la informacion"
                                {...register(`${props.listdb[1]}`, { required: true })} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit" onClick={handleSubmit(onSubmit)}>
                        Submit
                    </Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal >
            <Successful show={showSuccessModal}
                verify={props.verify}
                onHide={() => setShowSuccessModal(false)} />
        </div>
    );
};

export default Createdroute;
{/* <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName", { required: true })} />
        {errors.firstName && <span>Este campo es obligatorio</span>}
        <button type="submit">Enviar</button>
        </form>
    {props.body} */}
{/* {
        listShowReplaceID.map((title, index) => (
            props.listdb[index] === "isActive" ?
                <Form.Group key={index} className="mb-3">
                    <Form.Label>{title}</Form.Label>
                    <Form.Select {...register(`${props.listdb[index]}`, { required: true })}>
                        <option>Si</option>
                        <option>No</option>
                    </Form.Select>
                </Form.Group>
                : props.listdb[index] === "dia" ?
                    <Form.Group key={index} className="mb-3">
                        <Form.Label>{title}</Form.Label>
                        <Form.Select {...register(`${props.listdb[index]}`, { required: true })} >
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
                        <Form.Control
                            placeholder="Ingrese la informacion"
                            {...register(`${props.listdb[index]}`, { required: true })} />
                    </Form.Group>
        ))
    } */}