import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { setUserLoged, setUserThunk } from '../../store/slices/userLoged';
import { setIsLoading } from '../../store/slices/isLoading.slice';
import { useDispatch, useSelector } from 'react-redux';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Popover from 'react-bootstrap/Popover';

const Login = () => {

    const userLoged = useSelector(state => state.userLoged);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errPassword, setErrPassword] = useState(false);
    const [errUser, setErrUSer] = useState(false);

    const isLoggedUser = () => {
        const IsLogeed = localStorage.getItem("tokenLiquidation");
        if (IsLogeed) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }




    const validationPassword = () => {
        if (userLoged === "Password is not correct") {
            setErrPassword(true);
        }
        if (userLoged === "User does not exist") {
            setErrUSer(true);
        }
    }

    useEffect(() => {
        validationPassword();
        isLoggedUser();
    }, [userLoged]);

    const submit = (data) => {
        alert('Inicio Sesion')
        dispatch(setUserThunk(data))
        if (!userLoged) {
            navigate('/dashboard')
        } else {
            navigate('/login')
        }
    }


    // const popover = (
    //     <Popover id="popover-basic" >
    //         <Popover.Header as="h3" style={{ borderColor: 'rgba(255, 100, 100, 0.85)' }}>Entry error</Popover.Header>
    //         <Popover.Body>

    //             The <strong>email</strong> and <strong>password </strong> are incorrect.
    //         </Popover.Body>
    //     </Popover>
    // )
    // const pass = (
    //     <Popover id="popover-basic" >
    //         <Popover.Header as="h3" style={{ borderColor: 'rgba(0, 100, 100, 0.85)' }}>SUCCESSFUL INCOME</Popover.Header>
    //     </Popover>
    // )


    return (
        <div className='compenents-login'>

            <Row className="justify-content-md-center">
                <Col xs lg="4">
                    1 of 3
                    Login
                    <div className='prueba'>
                        alex
                    </div>
                </Col>
                <Col md="auto">Variable width content</Col>
                <Col xs lg="4">
                    3 of 3
                    <h3 className='title-h3 login'>Log in</h3>
                    <Form onSubmit={handleSubmit(submit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" {...register('mail')} style={{ borderColor: errUser ? "red" : null }} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" {...register('password')} style={{ borderColor: errPassword || errUser ? "red" : null }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                By logging in, you agree to BossDesing {" "}
                                <Alert.Link href='#'>Privacy Policy</Alert.Link>{" "}
                                and{" "}
                                <Alert.Link href='#'>Terms of Use</Alert.Link>.
                            </Form.Label>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            SIGN IN
                        </Button>
                    </Form>
                    <button>
                        <Link to={"/auth/sigin"}> Registrarse ahora</Link>
                    </button>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
