import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import verifyimg from "../../img/verificado.gif"
import { setSuccess } from '../../store/slices/Success.slice';

const Successful = () => {

    const dispatch = useDispatch();
    const success = useSelector(state => state.success);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    useEffect(() => {
        if (success === "success") {
            setShowSuccessModal(true)
        }
        if (showSuccessModal) {
            setTimeout(() => {
                dispatch(setSuccess("null"))
                handleClose();
                console.log("despacha el null en useEffect");
            }, 3000);
        }
    }, [showSuccessModal]);

    const handleClose = () => {
        setShowSuccessModal(false);
    }

    return (
        <div>
            <Modal show={showSuccessModal}
                onHide={handleClose}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='d-flex'>

                <Modal.Body>
                    <img style={{ maxWidth: "200px" }} src={verifyimg} alt="" />
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default Successful;