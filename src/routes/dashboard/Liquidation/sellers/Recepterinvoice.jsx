import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import Functionalitiesbtn from '../../../../components/atom/Functionalitiesbtn';
import Buttonatom from '../../../../components/atom/Buttonatom';
import { useDispatch, useSelector } from 'react-redux';
import Modalagginvoice from '../../../../components/Modals/Modalagginvoice';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import date from '../../../../utils/date';
import { getSellerThunk } from '../../../../store/slices/seller.slice';
import { getInvoiceThunk } from '../../../../store/slices/invoice.slice';
import { postPreLiquiThunk } from '../../../../store/slices/preLiquidationSeller.slice';

const Recepterinvoice = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        seller[0] ? null : dispatch(getSellerThunk());
        dispatch(getInvoiceThunk());
    }, [])
    const { id: sellerByLiqui } = useParams();
    const userLiquidador = useSelector(state => state.userLoged);
    const seller = useSelector(state => state.seller);
    const sellerLiqui = seller.filter((sell) => (sell.id === parseInt(sellerByLiqui)));
    const invoice = useSelector(state => state.invoice);
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [checkSelectedID, setCheckSelectedID] = useState([]);
    const filterInvoiceDia = invoice.filter((sell) => {
        return ((sell?.seller?.id === parseInt(sellerByLiqui)) &&
            (sell?.balance !== 0) && (sell?.client?.route_day?.day?.day === date.DatePastPresent('manana')))
    });

    const [data, setData] = useState(filterInvoiceDia);
    /*********** Agregar  FACTURAS  DE LA LISTA DE LIQUIDACION*****************/
    const aggInvoice = (agg) => {
        const idsAdd = data.map(ids => ids.id)
        //console.log(idsAdd);

        const Verficador = agg.filter(item => {
            //console.log(!(idsAdd).includes((item.id)));
            return !(idsAdd).includes((item.id))
        });
        //console.log(Verficador);
        //console.log(data);
        const concatData = data.concat(Verficador);
        //console.log(concatData);

        sessionStorage.setItem('invoiceGive', JSON.stringify(concatData));

        setData(concatData);
        setSelectedInvoices([]);
        setCheckSelectedID([]);
    }
    /*********** QUITAR  FACTURAS  DE LA LISTA DE LIQUIDACION*****************/

    const handleAddInvoice = (e, item) => {
        const { checked, value, name } = e.target;
        // //console.log(item);
        if (checked) {
            setSelectedInvoices([...selectedInvoices, item]);
            setCheckSelectedID(prevState => [...prevState, value]);
        } else {
            setSelectedInvoices(
                selectedInvoices.filter((selectedItem) => selectedItem.id !== item.id)
            );
            setCheckSelectedID(
                checkSelectedID.filter((selectedItem) => (selectedItem).toString() !== (item.id).toString())
            );
        }
    };

    const deleteInvoice = () => {
        Swal.fire({
            title: '¿Está seguro?',
            text: "En caso de equivocarte, puedes volver a agregar facturas desde el boton 'Agregar Facturas'.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                const eliminador = data.filter(item => {
                    return !(checkSelectedID).includes((item.id.toString()))
                });
                sessionStorage.setItem('invoiceGive', JSON.stringify(eliminador));
                // dispatch(setLiquidationSlice(eliminador));
                setData(eliminador);
                setSelectedInvoices([]);
                setCheckSelectedID([]);
            }
        })
    };
    const [showAggInvoice, setShowAggInvoice] = useState(false);
    const showSelectInvoice = () => {
        setShowAggInvoice(true);
    }
    /************************************************************************/

    const btnCreated = () => {
        return (
            <>
                <Buttonatom created={showSelectInvoice}
                    title={"Agregar Facturas"}
                    color={"success"} ico={"fa-circle-plus"} />
                <Buttonatom created={(() => deleteInvoice())}
                    title={"Quitar Facturas"}
                    color={"danger"} ico={"fa-trash-can"} />
            </>
        )
    };
    const totalEntregado = Object.values(data).reduce((acc, cur) => acc + parseFloat(cur?.balance), 0);

    const finish = () => {
        let direccion = `/dashboard/liquidation/sellers/${sellerByLiqui}/print/invoice-give`;
        let principal = {};
        principal.user = userLiquidador.username;
        principal.date = `${date.CurrendateDay()} - ${date.Currendate()}`;
        principal.dateBack = `${date.Currendate()}`;
        principal.seller = `${sellerLiqui[0]?.code} - ${sellerLiqui[0]?.name}`;
        principal.sellerBack = `${sellerLiqui[0]?.id}`;
        principal.total = totalEntregado;

        let arrayPrint = []
        arrayPrint.push(principal);
        arrayPrint.push(data);
        arrayPrint.push(totalEntregado);
        //console.log(arrayPrint);
        Swal.fire({
            title: '¿Está seguro?',
            text: `Se realizara el registro de facturas entregadas a ${principal.seller}.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#029C63',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Registrar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Alert!',
                        text: 'Debes agregar al menos una factura',
                        showConfirmButton: true,
                    });
                } else {
                    sessionStorage.setItem("docInvoiceGive", JSON.stringify(arrayPrint));
                    Swal.fire({
                        icon: 'success',
                        title: 'Guardado!',
                        text: `Se a generadado el documento de entrega de Facturas con Exito`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setTimeout(() => {
                        window.open(direccion, "", "height=600,width=1200,center");
                        navigate(`/dashboard`);
                        dispatch(postPreLiquiThunk(arrayPrint));
                    }, [1000]);
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Cancelado!',
                    text: 'Se a cancelado el registro, puede realizar los cambios necesarios',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        });
    };

    const imprimirContenido = () => {
        let direccion = `/dashboard/liquidation/sellers/${sellerByLiqui}/print/invoice-give`;
        let principal = {};
        principal.user = userLiquidador.username;
        principal.date = `${date.CurrendateDay()} - ${date.Currendate()}`;
        principal.seller = `${sellerLiqui[0]?.code} - ${sellerLiqui[0]?.name}`;



        let arrayPrint = []
        arrayPrint.push(principal);
        arrayPrint.push(data);
        arrayPrint.push(totalEntregado);

        if (data.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Alert!',
                text: 'Debes agregar al menos una factura',
                showConfirmButton: true,
            });
        } else {
            sessionStorage.setItem("docInvoiceGive", JSON.stringify(arrayPrint));
            window.open(direccion, "", "height=600,width=1200,center");
        }
    };

    const cancelation = () => {
        Swal.fire({
            title: '¿Está seguro?',
            text: `Estas a punto de salir sin realizar la entrega de facturas de cobro, no podras realizar esta accion hazta que vuelvas a liquidar al vendedor`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#029C63',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Deseo salir!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto!',
                    text: 'Termino de manera Correcta la liquidacion',
                    timer: 1500,
                    showConfirmButton: false
                });


                navigate(`/dashboard/liquidation/sellers`);

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Cancelado!',
                    text: 'Se a cancelado la accion, puede realizar los cambios necesarios',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    };
    return (
        <div>
            <h4>Liquidacion de Vendedores</h4>
            <h5>Usuario: <span style={{ color: "#02B875" }}> {userLiquidador.username} </span> </h5>
            <h5>Fecha de liquidacion: <span style={{ color: "#02B875" }}>{date.CurrendateDay()} {date.Currendate()} </span> </h5>
            <h5>Se esta liquidando al Vendedor:
                <span style={{ color: "#02B875" }}> {sellerLiqui[0]?.code} - {sellerLiqui[0]?.name}</span>
            </h5>
            <div style={{ margin: "2rem 1rem" }}>


                <div>
                    <h5>Lista de Facturas para proxima liquidacion</h5>
                    <Functionalitiesbtn
                        buttons={btnCreated}
                        listAvailable={""}
                    />
                </div>
                <div>
                    <Table striped bordered hover responsive style={{ width: "1200px", fontSize: "12px", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th style={{ width: "30px" }}>select</th>
                                <th style={{ width: "30px" }}>item</th>
                                {/* <th style={{ width: "40px" }}>ID</th> */}
                                <th style={{ width: "300px" }}>Cliente</th>
                                <th style={{ width: "150px" }}># Factura</th>
                                <th style={{ width: "80px" }}>N. Venta</th>
                                <th style={{ width: "90px" }}>Estatus</th>
                                <th style={{ width: "150px" }}>Fecha Entrega</th>
                                <th style={{ width: "100px" }}>Total</th>
                                <th style={{ width: "100px" }}>Saldo</th>
                                <th style={{ width: "100px" }}>Detalle</th>
                                <th style={{ width: "150px" }}>Vendedor</th>
                            </tr>
                        </thead>
                        <tbody >
                            {data?.map((item, index) => (

                                <tr key={index} style={{ height: "50px" }}>

                                    <td>
                                        <input type="checkbox"
                                            name='id_select'
                                            value={item.id}
                                            checked={(checkSelectedID.includes((item.id).toString()))}
                                            onChange={(e) => handleAddInvoice(e, item)} />
                                    </td>

                                    <td style={{ width: "15px", fontSize: "10px" }}>{index + 1}</td>

                                    {/* <td style={{ textAlign: "center" }}>
                            {item.id}
                        </td> */}

                                    <td style={{ width: "250px", fontSize: "13px" }}>
                                        {(item.client?.fullname)?.substring(0, 20)}
                                    </td>

                                    <td style={{ width: "130px", fontSize: "13px" }}>
                                        {(item?.num_bill)}
                                    </td>
                                    <td>{item?.isWhite === true ? "Si" : "No"}</td>

                                    <td>{item?.id_status === 1 ? "Pendiente" : item?.id_status === 2 ? "Abonada" : "Pagada"}</td>
                                    <td>
                                        <h6 className={item?.balance === 0 ? "dateSaldoCero" : (date.DatePastPresent(item?.deliver_date) >= 30 ? "dateRed" :
                                            date.DatePastPresent(item?.deliver_date) >= 15 ? "dateYellow" : "dateGreen")} >
                                            {`(${date.DatePastPresent(item?.deliver_date)})`}  {item?.deliver_date}
                                        </h6>
                                    </td>

                                    <td style={{ width: "115px", fontSize: "13px" }}>
                                        <h5 style={{ fontSize: "15px" }}>$ {(item.total_bill)?.toFixed(2)}</h5>
                                    </td>

                                    <td >
                                        <h5 style={{ fontSize: "15px" }}>$ {(item.balance)?.toFixed(2)}</h5>
                                    </td>
                                    <td >
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item?.detail}</Tooltip>}>
                                            <span className="d-inline-block">
                                                <div style={{ textAlign: "center", border: "2px solid var(--first-color)", pointerEvents: 'none' }}>
                                                    Ver Detalle
                                                </div>
                                            </span>
                                        </OverlayTrigger>
                                    </td>

                                    <td style={{ width: "120px", fontSize: "14px" }}>
                                        {item.seller?.code} -  {(item.seller?.name)?.split(" ")[0]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h5>Total a Entregar: $ {(parseFloat(totalEntregado)).toFixed(2)}</h5>
                </div>
                <Modalagginvoice data={invoice}
                    type={"seller"}
                    showAggInvoice={showAggInvoice}
                    setShowAggInvoice={setShowAggInvoice}
                    aggInvoice={aggInvoice} />

                <div className='btn-liquidation'>
                    <Button style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
                        onClick={cancelation} variant="danger">
                        <i className="fa-regular fa-circle-xmark bx-fw"></i>
                        No entregar
                    </Button>

                    <Button style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
                        onClick={imprimirContenido} variant="outline-info">
                        <i className="fa-solid fa-print bx-fw"></i>
                        Imprimir
                    </Button>

                    <Button style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} variant="success"
                        onClick={finish}>
                        <i className="fa-solid fa-circle-check bx-fw"></i>
                        Entregar e Imprimir
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Recepterinvoice;