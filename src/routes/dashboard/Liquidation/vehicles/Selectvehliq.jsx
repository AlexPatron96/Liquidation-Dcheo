import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CardBtn from '../../../../components/CardBtn';
import imgVehC from '../../../../img/conductor.png';
import { getVehiclesThunk } from '../../../../store/slices/vehicles.slice';
import date from '../../../../utils/date';

const Selectliqveh = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVehiclesThunk());
    }, [])

    const vehicles = useSelector(state => state.vehicles);


    const identificarDia = date.CurrendateDay();
    const selectVeh = (data) => {
        console.log(data.placa);
        alert("Veh selected " + data.placa + " " + identificarDia)
    }

    return (
        <div className='doVehicleLiq pages'>
            <div className='card-select1'>
                <h1 className='m-3' >Selecciona el vehiculo a liquidar</h1>
                <div className='card-btn' >
                    <Row>

                        {
                            vehicles?.map((veh, index) => (
                                <Col key={index} >

                                    {/* to={"/dashboard/do-vehicleliquidation"} */}
                                    <Link className='linkStyle' to={`/dashboard/liquidation/vehicles/${veh.id}`} onClick={() => selectVeh(veh)}>
                                        <h1>{index + 1}</h1>
                                        <CardBtn title={veh.chofer} img={imgVehC} />
                                    </Link>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </div>
            <div className='do-vehicle'>

            </div>
        </div>
    );
};

export default Selectliqveh;