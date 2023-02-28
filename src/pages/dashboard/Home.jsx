import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import CardBtn from '../../components/CardBtn';
import imgHome1 from '../../img/enviado.png';
import imgHome2 from '../../img/vendedor.png';


const Home = () => {

    return (
        <div className='home pages'>
            <h1>Bienvenido a la App de Liquidacion</h1>
            
            <div className='card-btn'>
                <Row>
                    <Col>
                        1 of 2
                        <Link className='linkStyle' to={"/dashboard/selectliqveh"}>
                            <CardBtn title={"Liquidation of vehicles"} img={imgHome1} />
                        </Link>
                    </Col>
                    <Col>
                        2 of 2
                        <Link className='linkStyle' to={"/dashboard/selectliqsell"}>
                            <CardBtn title={"Seller liquidation"} img={imgHome2} />
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Home;