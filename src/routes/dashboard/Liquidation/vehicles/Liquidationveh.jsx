import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Buttonatom from '../../../../components/atom/Buttonatom';
import Itemformshow from '../../../../components/atom/Itemformshow';
import Modalagginvoice from '../../../../components/atom/Modalagginvoice';
import Modalcash from '../../../../components/atom/Modalcash';
import Modalexpense from '../../../../components/atom/Modalexpense';
import Modalprodret from '../../../../components/atom/Modalprodret';
import Tabledinamik from '../../../../components/molecules/Tabledinamik';
import { getCustomerThunk } from '../../../../store/slices/customer.slice';
import { getInvoiceThunk } from '../../../../store/slices/invoice.slice';
import { getSellerThunk } from '../../../../store/slices/seller.slice';
import { getVehiclesThunk } from '../../../../store/slices/vehicles.slice';
import currentdate from '../../../../utils/date';


const Liquidationveh = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVehiclesThunk());
        dispatch(getInvoiceThunk());
        dispatch(getSellerThunk());
        dispatch(getCustomerThunk());
    }, [])

    const style2 = {
        display: "flex",
        gap: "0.25rem",
        flexWrap: "wrap",
        margin: "0.5rem",
        border: " 1px solid var(--color2)",
        borderRadius: "10px",
        padding: "1rem",
        justifyContent: "center",
        maxWidth: "200px",
        flexDirection: "column"
    }

    const { id: userId } = useParams();
    const vehicles = useSelector(state => state.vehicles);
    const invoice = useSelector(state => state.invoice);
    /*************    Filtro de clientes pertenecientes a dia especificado   *************/
    const invoiceDia = invoice.filter((veh) => {
        return ((veh.id_client_bill.id_vehicle === parseInt(userId)) &&
            (veh.id_client_bill.route.dia === currentdate.CurrendateDay("ayer")) &&
            (veh.saldo !== 0))
    });
    console.log(invoiceDia);
    /***********************************************************************************/

    const seller = useSelector(state => state.seller);
    const customer = useSelector(state => state.customer);
    const vehSelect = vehicles.find(element => (element.id === parseInt(userId)));
    const [refresh, setRefresh] = useState(false)
    const [liquidationAct, setLiquidationAct] = useState(true);

    /*********** MODALS DE EXPENSES - CASH - RETURN *****************/
    const listdbCash = [
        "id_tabla_liq",
        "monedas",
        "efectivo",
        "depositos",
        "cheque",
        "total",
        "detalle_adt"
    ]
    const listdbExpense = [
        'id_tabla_liq',
        'alimentacion',
        'combustible',
        'vehiculo',
        'peaje',
        'total',
        'detalle_adt'
    ]
    const listdbProducRetorn = [
        'id_tabla_liq',
        'mal_estado',
        'rechazados',
        'total',
        'detalle_adt'
    ]
    const [cash, setCash] = useState([]);
    const [expense, setExpense] = useState([])
    const [productReturn, setProductReturn] = useState([]);
    const [showAggInvoice, setShowAggInvoice] = useState(false);
    /*****************************************************************/
    const createInvo = (data) => {
        // alert('Creando factura')
        console.log(data);
        // dispatch(postInvoicethunk(data));
        setRefresh(true)
    }
    const updateInvo = (data) => {
        alert('actualizando factura')
        console.log(data);
        // dispatch(updateInvoiceThunk(data));
        setRefresh(true)
    }
    const delInvo = (id) => {
        // dispatch(deleteInvoiceThunk(id));
        setRefresh(true)
    }
    // console.log(invoice);

    const aggInvoice = () => {
        setShowAggInvoice(true);
    }
    return (
        <div className='LiquidationVeh'>
            <Modalagginvoice showAggInvoice={showAggInvoice} setShowAggInvoice={setShowAggInvoice} />
            <div>
                <h6>{`${vehSelect?.placa} - ${vehSelect?.chofer} `}</h6>
            </div>
            <div>
                <h6>Fecha de liquidacion:{" "}{currentdate.CurrendateDay()}{" "}{currentdate.Currendate()}</h6>
                <h6>Lista de Facturas Asignadas</h6>
            </div>
            <button onClick={() => setRefresh(true)} >Refresh</button>
            <div>

                <Buttonatom created={aggInvoice}
                    title={"Agregar Facturas"}
                    color={"success"} ico={"fa-circle-plus"} />
                <Buttonatom created={(() => setRefresh(true))}
                    title={"Actualizar"}
                    color={"info"} ico={"fa-sync fa-spin"} />
            </div>

            <div className='liquidationVeh-component' style={{ border: "2px solid red" }}>
                <div className='liquidationVeh-listfac'>
                    <Tabledinamik invoice={invoiceDia}
                        seller={seller} customer={customer}
                        createInvo={createInvo} delInvo={delInvo}
                        updateInvo={updateInvo} refresh={refresh}
                        liquidationAct={liquidationAct} />
                </div>
                <div className='liquidationVeh-liscompnent'>
                    <div className='' style={{ maxWidth: "95%", maxHeight: "500px", gap: "0.1rem !important" }}>
                        <div style={style2}>
                            <h4>Cash</h4>
                            <Itemformshow title={"Monedas"} show={cash.monedas} />
                            <Itemformshow title={"Billetes"} show={cash.efectivo} />
                            <Itemformshow title={"Depositos"} show={cash.depositos} />
                            <Itemformshow title={"Cheque"} show={cash.cheque} />
                            <Itemformshow title={"Total"} show={cash.total} />
                            <Modalcash listdbCash={listdbCash} setCash={setCash} />
                        </div>
                    </div>
                    <div className='' style={{ maxWidth: "95%", maxHeight: "500px", gap: "0.1rem !important" }}>
                        <div style={style2}>
                            <h4>Expense</h4>
                            <Itemformshow title={"Alimentacion"} show={expense.alimentacion} />
                            <Itemformshow title={"Combustible"} show={expense.combustible} />
                            <Itemformshow title={"Vehiculo"} show={expense.vehiculo} />
                            <Itemformshow title={"Peaje"} show={expense.peaje} />
                            <Itemformshow title={"Total"} show={expense.total} />
                            <Modalexpense listdbExpense={listdbExpense} setExpense={setExpense} />
                        </div>
                    </div>
                    <div className='' style={{ maxWidth: "95%", maxHeight: "500px", gap: "0.1rem !important" }}>
                        <div style={style2}>
                            <h4>Product Returned</h4>
                            <Itemformshow title={"Mal estado"} show={productReturn.mal_estado} />
                            <Itemformshow title={"Rechazados"} show={productReturn.rechazados} />
                            <Itemformshow title={"total"} show={productReturn.total} />
                            <Modalprodret listdbProducRetorn={listdbProducRetorn} setProductReturn={setProductReturn} />
                        </div>
                    </div>

                </div>

            </div>
        </div >
    );
};

export default Liquidationveh;