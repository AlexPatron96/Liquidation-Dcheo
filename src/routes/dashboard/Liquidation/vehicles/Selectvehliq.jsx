import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CardBtn from '../../../../components/CardBtn';
import imgVehC from '../../../../img/conductor.png';
// import { setLiquidationSlice } from '../../../../store/slices/liquidation.slice';
import { getVehiclesThunk } from '../../../../store/slices/vehicles.slice';
import date from '../../../../utils/date';
import Swal from 'sweetalert2';
import { getInvoiceThunk } from '../../../../store/slices/invoice.slice';
import currentdate from '../../../../utils/date';

const Selectliqveh = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        vehicles[0] ? null : dispatch(getVehiclesThunk());
        invoice[0] ? null : dispatch(getInvoiceThunk());
    }, [])

    const vehicles = useSelector(state => state.vehicles);
    const invoice = useSelector(state => state.invoice);
    const vehActive = vehicles.filter(veh => veh?.isActive === true);

    const identificarDia = date.CurrendateDay();

    const selectVeh = (data) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: `Vas a realizar la liquidacion de el vehiculo ${data.driver} del dia ${(identificarDia).toUpperCase()}`,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, proseguir!',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                const filterInvoiceDia = invoice.filter((veh) => {
                    return ((veh?.client?.route_day?.day?.day === currentdate.CurrendateDay("ayer")) &&
                        (veh.balance !== 0))
                });
                // dispatch(setLiquidationSlice(filterInvoiceDia));
                sessionStorage.setItem(`invoLiq${data?.dni}-${data?.id}`, JSON.stringify(filterInvoiceDia))
                navigate(`/dashboard/liquidation/vehicles/${data?.id}`);
            }
        });
    };

    return (
        <div className='doVehicleLiq pages'>
            <div className='card-select1'>
                <h3 className='m-3' style={{fontSize:"40px"}} >Selecciona el vehiculo a liquidar</h3>
                <div className='card-btn' >
                    <Row>

                        {
                            vehActive?.map((veh, index) => (
                                <Col key={index} >

                                    {/* to={"/dashboard/do-vehicleliquidation"} to={`/dashboard/liquidation/vehicles/${veh.id}`}  */}
                                    <Link className='linkStyle' onClick={() => selectVeh(veh)}>
                                        <h5>{index + 1}</h5>
                                        <CardBtn title={veh.driver} img={imgVehC} />
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