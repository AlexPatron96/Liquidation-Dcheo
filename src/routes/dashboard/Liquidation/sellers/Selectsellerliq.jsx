import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CardBtn from '../../../../components/CardBtn';
import imgSeller from '../../../../img/imgSeller.png';
// import { setLiquidationSlice } from '../../../../store/slices/liquidation.slice';
import date from '../../../../utils/date';
import Swal from 'sweetalert2';
import { getInvoiceThunk } from '../../../../store/slices/invoice.slice';
import currentdate from '../../../../utils/date';
import { getSellerThunk } from '../../../../store/slices/seller.slice';

const Selectsellerliq = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        seller[0] ? null : dispatch(getSellerThunk());
        invoice[0] ? null : dispatch(getInvoiceThunk());
    }, [])

    const seller = useSelector(state => state.seller);
    //console.log(seller);
    const sellerActive = seller.filter(sell => sell?.isActive === true);
    const invoice = useSelector(state => state.invoice);
    const identificarDia = date.CurrendateDay();
    // const codeInvoLocalStorage = `invoLiq${sellerLiqui[0]?.code}-${sellerLiqui[0]?.id}`;

    const selectSeller = (data) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: `Vas a realizar la liquidacion de el Vendedor ${data?.name} del dia ${identificarDia}`,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, proseguir!',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                // const filterInvoiceDia = invoice?.filter((sell) => {
                //     return ((sell?.seller?.id === parseInt(data?.id)) &&
                //         (sell?.client?.route_day?.day?.day === currentdate.CurrendateDay(" ")) &&
                //         (sell?.balance !== 0))
                // });
                // dispatch(setLiquidationSlice(filterInvoiceDia));
                // sessionStorage.setItem(`invoLiq${data?.code}-${data?.id}`, JSON.stringify(filterInvoiceDia))
                navigate(`/dashboard/liquidation/sellers/${data?.id}`);
            }
        })
    };
    
    return (
        <div className='doSellerLiq pages'>
            <div className='card-select1'>
                <h1 className='m-3' >Selecciona el Vendedor a liquidar</h1>
                <div className='card-btn' >
                    <Row>
                        {
                            sellerActive?.map((sell, index) => (
                                <Col key={index} >
                                    {/* to={"/dashboard/do-vehicleliquidation"} to={`/dashboard/liquidation/vehicles/${veh.id}`}  */}
                                    <Link className='linkStyle' style={{margin:"0.5rem 3rem"}} onClick={() => selectSeller(sell)}>
                                        <h5>{sell?.code}</h5>
                                        <CardBtn title={(sell?.name).substring(0, 18)} img={imgSeller} />
                                        {/* <h6></h6> */}
                                        <span>Balance: ${sell?.balance_sell?.total}</span>
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

export default Selectsellerliq;