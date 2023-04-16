import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Buttonatom from '../../../../components/atom/Buttonatom';
import Functionalitiesbtn from '../../../../components/atom/Functionalitiesbtn';
import Cash from '../../../../components/cards/Cash';
import Discount from '../../../../components/cards/Discount';
import Expenses from '../../../../components/cards/Expenses';
import Modalagginvoice from '../../../../components/Modals/Modalagginvoice';
import ModalTransaccion from '../../../../components/Modals/ModalTransaccion';
import TableLiquidationSeller from '../../../../components/Show/TableLiquidationSeller';
import { getInvoiceThunk } from '../../../../store/slices/invoice.slice';
import { postSellerLiquidationthunk, setLiquidationSlice } from '../../../../store/slices/liquidation.slice';
import { getSellerThunk } from '../../../../store/slices/seller.slice';
import date from "../../../../utils/date"
import genCod from '../../../../utils/genCod';

const Liquidationsell = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: sellerByLiqui } = useParams();

    useEffect(() => {
        seller[0] ? null : dispatch(getSellerThunk());
        invoice[0] ? null : dispatch(getInvoiceThunk());
    }, [])

    const userLiquidador = useSelector(state => state.userLoged)
    const seller = useSelector(state => state.seller)
    const invoice = useSelector(state => state.invoice)
    const invoiceDia = useSelector(state => state.liquidation);
    const sellerLiqui = seller.filter((sell) => (sell.id === parseInt(sellerByLiqui)));
    console.log(sellerLiqui);
    const [codLiq, setCodLiq] = useState("")

    const filterInvoiceDia = invoice.filter((sell) => {
        return ((sell.seller.id === parseInt(sellerByLiqui)) &&
            (sell.balance !== 0))
    });

    const [invoiceLiquidation, setInvoiceLiquidation] = useState(filterInvoiceDia);
    // console.log(invoiceLiquidation);

    // const filterInvoiceDia = invoice.filter((sell) => {
    //     return ((sell.seller.id === parseInt(sellerByLiqui)) &&
    //         (sell.client?.route_day.day.day === date.CurrendateDay(" ")) &&
    //         (sell.balance !== 0))
    // });
    const codeInvoLocalStorage = `invoLiq${sellerLiqui[0]?.code}-${sellerLiqui[0]?.id}`;
    const codeExpeLocalStorage = `expensesLiq${sellerLiqui[0]?.code}-${sellerLiqui[0]?.id}`;
    const codeDiscountLocalStorage = `discountLiq${sellerLiqui[0]?.code}-${sellerLiqui[0]?.id}`;
    const codeCashLocalStorage = `cashLiq${sellerLiqui[0]?.code}-${sellerLiqui[0]?.id}`;
    const codeCheckLocalStorage = `checkLiq${sellerLiqui[0]?.code}-${sellerLiqui[0]?.id}`;
    const codeTransacLocalStorage = `trans${sellerLiqui[0]?.code}-${sellerLiqui[0]?.id}`;


    const loadInvoice = () => {

        const sesionLocal = JSON.parse(sessionStorage.getItem(codeInvoLocalStorage));
        const sesionLocalTrans = JSON.parse(sessionStorage.getItem(codeTransacLocalStorage));
        const expensesSesionStorage = JSON.parse(sessionStorage.getItem(codeExpeLocalStorage));
        const discountSesionStorage = JSON.parse(sessionStorage.getItem(codeDiscountLocalStorage));
        const cashSesionStorage = JSON.parse(sessionStorage.getItem(codeCashLocalStorage));
        const checkSesionStorage = JSON.parse(sessionStorage.getItem(codeCheckLocalStorage));

        sesionLocal?.[0] ? console.log("si existe") : sessionStorage.setItem(codeInvoLocalStorage, JSON.stringify(filterInvoiceDia));
        sesionLocal?.[0] ? setInvoiceLiquidation(sesionLocal) : setInvoiceLiquidation(invoiceLiquidation);
        sesionLocal?.[0] ? console.log('Sesion storage') : console.log("Backend");
        checkSesionStorage?.[0] ? setCheckMoney(checkSesionStorage) : setCheckMoney([]);
        sesionLocalTrans?.[0] ? setTransaction(sesionLocalTrans) : setTransaction([]);

        setCodLiq(genCod(`LIQ-${sellerLiqui[0]?.code}-`));
        cashSesionStorage ? setCash(cashSesionStorage) : setCash({});
        expensesSesionStorage ? setExpenses(expensesSesionStorage) : setExpenses({});
        discountSesionStorage ? setDiscount(discountSesionStorage) : setDiscount({});
        sessionStorage.removeItem('printSeller');

    };


    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [checkSelectedID, setCheckSelectedID] = useState([]);

    /*********** Agregar  FACTURAS  DE LA LISTA DE LIQUIDACION*****************/
    const aggInvoice = (data) => {
        const idsAdd = invoiceLiquidation.map(ids => ids.id)
        const Verficador = data.filter(item => {
            return !(idsAdd).includes((item.id))
        });
        const concatData = invoiceLiquidation.concat(Verficador);
        sessionStorage.setItem(codeInvoLocalStorage, JSON.stringify(concatData));
        // dispatch(setLiquidationSlice(concatData));
        setInvoiceLiquidation(concatData);
        setSelectedInvoices([]);
        setCheckSelectedID([]);
    }
    /*********** QUITAR  FACTURAS  DE LA LISTA DE LIQUIDACION*****************/

    const handleAddInvoice = (e, item) => {
        const { checked, value, name } = e.target;
        // console.log(item);
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
                const eliminador = invoiceLiquidation.filter(item => {
                    return !(checkSelectedID).includes((item.id.toString()))
                });
                sessionStorage.setItem(codeInvoLocalStorage, JSON.stringify(eliminador));
                setInvoiceLiquidation(eliminador);
                setSelectedInvoices([]);
                setCheckSelectedID([]);
            }
        })
    };
    /************************************************************************/



    /*********** Pago o abonos de FACTURAS  DE LA LISTA DE LIQUIDACION*****************/
    const [transaction, setTransaction] = useState([]);

    const [modalTransaccionPay, setModalTransaccionPay] = useState(false);
    const [itemTableliqui, setItemTableliqui] = useState([]);
    const sumTotalCobrado = Object.values(transaction).reduce((acc, cur) => acc + parseFloat(cur?.pay), 0);
    const modaltransaccionPay = (item) => {
        setModalTransaccionPay(true);
        setItemTableliqui(item);
    };

    const transactionpay = (item) => {
        const validador = transaction.filter((valid) => valid?.id_bill === item?.id_bill)
        if (validador[0]) {
            const eliminador = transaction.filter(elim => {
                return !(item.num_bill).includes((elim.num_bill))
            });

            const validadorLiquidation = invoiceLiquidation.forEach(inv => {
                if (inv.num_bill === item.num_bill) {
                    console.log("encontre la factura");
                    const newInv = {
                        ...inv,
                        pago: item.pay
                    };
                    setInvoiceLiquidation(prevState => prevState.map(prevInv => prevInv.num_bill === item.num_bill ? newInv : prevInv));
                    // Guardar en sessionStorage
                    const sessionInvoiceLiquidation = JSON.parse(sessionStorage.getItem(codeInvoLocalStorage));
                    const newSessionInvoiceLiquidation = sessionInvoiceLiquidation.map(sessionInv => sessionInv.num_bill === item.num_bill ? newInv : sessionInv);
                    sessionStorage.setItem(codeInvoLocalStorage, JSON.stringify(newSessionInvoiceLiquidation));
                }
            });
            setTransaction(eliminador);
            sessionStorage.setItem(codeTransacLocalStorage, JSON.stringify(eliminador));
            setTransaction(prevState => [...prevState, item]);
            sessionStorage.setItem(codeTransacLocalStorage, JSON.stringify([...eliminador, item]));
        } else {

            const validadorLiquidation = invoiceLiquidation.forEach(inv => {
                if (inv.num_bill === item.num_bill) {
                    console.log("encontre la factura");
                    const newInv = {
                        ...inv,
                        pago: item.pay
                    };
                    setInvoiceLiquidation(prevState => prevState.map(prevInv => prevInv.num_bill === item.num_bill ? newInv : prevInv));

                    // Guardar en sessionStorage
                    const sessionInvoiceLiquidation = JSON.parse(sessionStorage.getItem(codeInvoLocalStorage));
                    const newSessionInvoiceLiquidation = sessionInvoiceLiquidation.map(sessionInv => sessionInv.num_bill === item.num_bill ? newInv : sessionInv);
                    sessionStorage.setItem(codeInvoLocalStorage, JSON.stringify(newSessionInvoiceLiquidation));
                }
            });
            console.log(invoiceLiquidation);
            setTransaction(prevState => [...prevState, item]);
            sessionStorage.setItem(codeTransacLocalStorage, JSON.stringify([...transaction, item]));
        }
    };

    const [showAggInvoice, setShowAggInvoice] = useState(false);
    const showSelectInvoice = () => {
        setShowAggInvoice(true);
    }
    /************************************************************************/

    /*********** EXPENSES - CASH *****************/
    const [expenses, setExpenses] = useState([]);
    const [cash, setCash] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [checkMoney, setCheckMoney] = useState([]);
    const [checkMoneyView, setCheckMoneyView] = useState([]);

    const totalExpenses = parseFloat(expenses.total || 0);
    const totalCash = parseFloat(cash.total || 0);
    const totalDiscount = parseFloat(discount.total_other || 0);
    const totalVendedor = (totalExpenses + totalCash + totalDiscount).toFixed(2);
    const cuadre = (parseFloat(totalVendedor).toFixed(2) - ((sumTotalCobrado).toFixed(2) || 0)).toFixed(2);
    // const cuadre = ( ((expenses?.total) || 0) - ((discount?.total_other) || 0) - ((cash?.total) || 0) - ((sumTotalCobrado).toFixed(2) || 0)).toFixed(2);
    const receptedExpenses = (item) => {
        setExpenses(item);
    };

    const receptedDiscount = (item) => {
        setDiscount(item);
    };

    const receptedCash = (cash, check, checkView) => {
        setCash(cash);
        setCheckMoney(check);
        setCheckMoneyView(checkView);
    };

    /************************************************************************/
    const loaderData = () => {
        let principal = {};
        principal.id_user = userLiquidador.id;
        principal.id_seller = sellerLiqui[0]?.id;
        principal.balance_gen_sell = sellerLiqui?.[0].balance_sell.total;
        principal.settlement_code = codLiq;
        principal.total_collection_bills = (sumTotalCobrado).toFixed(2);
        principal.total_money = parseFloat(cash?.total) || 0;
        principal.total_expense = parseFloat(expenses?.total) || 0;
        principal.total_discount = parseFloat(discount?.total_other) || 0;
        principal.total_received = totalVendedor || 0;
        principal.detail = "ok";
        principal.balance = cuadre;
        principal.isLiquidated = false;

        let arraySendLiq = [];
        arraySendLiq.push(checkMoney);
        arraySendLiq.push(discount);
        arraySendLiq.push(expenses);
        arraySendLiq.push(cash);
        arraySendLiq.push(transaction);
        arraySendLiq.push(invoiceLiquidation)
        arraySendLiq.push(codLiq)
        arraySendLiq.push(`${userLiquidador.username}`)
        arraySendLiq.push(`${(date.CurrendateDay()).toUpperCase()} - ${date.Currendate()}`)
        arraySendLiq.push(`${sellerLiqui[0]?.code} - ${sellerLiqui[0]?.name}`)
        arraySendLiq.push(principal);
        arraySendLiq.push(checkMoneyView);

        return arraySendLiq;
    };

    const deleteData = () => {
        setCodLiq('');
        setInvoiceLiquidation([]);
        setTransaction([]);
        setExpenses([]);
        setDiscount([]);
        setCash([]);

        sessionStorage.removeItem(codeExpeLocalStorage);
        sessionStorage.removeItem(codeDiscountLocalStorage);
        sessionStorage.removeItem(codeCashLocalStorage);
        sessionStorage.removeItem(codeInvoLocalStorage);
        sessionStorage.removeItem(codeCheckLocalStorage);
        sessionStorage.removeItem(codeCheckLocalStorage + "view");
        sessionStorage.removeItem(codeTransacLocalStorage);
        sessionStorage.removeItem('printSeller');
    };


    const liquidar = () => {
        let direccion = `/dashboard/liquidation/sellers/print/${codLiq}`;

        const arraySendLiq = loaderData();
        
        Swal.fire({
            title: '¿Está seguro?',
            text: `Se realizara la liquidacion del vendedor ${sellerLiqui[0]?.name}, no se podra revertir los cambios despues de confirmar la liquidacion .`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#029C63',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Liquidar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (!(codLiq) || Object.keys(expenses).length === 0 || Object.keys(discount).length === 0 || Object.keys(cash).length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Alert!',
                        text: 'Debes de Generar el Codigo de liquidacion y completar los campos Necesarios. En Caso que no tengas datos completa los campos con Cero ( 0 ).',
                        showConfirmButton: true,
                    });
                } else {
                    sessionStorage.setItem("printSeller", JSON.stringify(arraySendLiq));
                    deleteData();
                    dispatch(postSellerLiquidationthunk(arraySendLiq));
                    Swal.fire({
                        icon: 'success',
                        title: 'Guardado!',
                        text: `Se a generadado la liquidacion con exito`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setTimeout(() => {
                        window.open(direccion, "", "height=600,width=1200,center");
                    }, [1000]);
                    navigate(`/dashboard/liquidation/sellers/${principal.id_seller}/received-inovices`)
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
        })
    };

    const cancelLiquidation = () => {
        deleteData();
        navigate('/dashboard/liquidation/sellers');
    };

    function imprimirContenido() {
        let direccion = `/dashboard/liquidation/sellers/print/${codLiq}`;
        const arraySendLiq = loaderData();        

        if (!(codLiq) || Object.keys(expenses).length === 0 || Object.keys(discount).length === 0 || Object.keys(cash).length === 0) {
            Swal.fire({
                title: 'Alerta',
                text: 'Debes de Generar el Codigo de liquidacion y completar los campos Necesarios. En Caso que no tengas datos completa los campos con Cero ( 0 ).',
                icon: "warning",
                confirmButtonColor: '#029C63',
                confirmButtonText: 'OK',
            })
        } else {
            sessionStorage.setItem("printSeller", JSON.stringify(arraySendLiq));
            window.open(direccion, "", "height=600,width=1200,center");
            // ventana.print();
        }
    };
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
                <Buttonatom created={loadInvoice}
                    title={""}
                    color={"success"} ico={"fa-truck-ramp-box bx-fade-up-hover"} />
            </>
        )
    }



    return (
        <div>

            {/* <button onClick={imprimirContenido}>Imprimir</button> */}

            <div id="contenido-a-imprimir">

                <h4>Liquidacion de Vendedores</h4>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "0 2rem" }}>
                    <div>
                        <h5>Usuario: <span style={{ color: "#02B875" }}> {userLiquidador.username} </span> </h5>
                        <h5>Fecha de liquidacion: <span style={{ color: "#02B875" }}>{date.CurrendateDay()} {date.Currendate()} </span> </h5>
                        <h5>Se esta liquidando al Vendedor:
                            <span style={{ color: "#02B875" }}> {sellerLiqui[0]?.code} - {sellerLiqui[0]?.name}</span>
                        </h5>
                    </div>
                    <div style={{ border: "2px solid var(--first-color)", padding: "0.5rem", textAlign: "center" }}>
                        <h5>Balance General:</h5>
                        <h4 style={{
                            color: `${sellerLiqui?.[0].balance_sell.total > 0 ?
                                "#FFAC42" : sellerLiqui?.[0].balance_sell.total < 0 ? "#C20114" : "#02B875"}`
                        }}>
                            ${parseFloat(sellerLiqui?.[0].balance_sell.total).toFixed(2)}
                        </h4>
                    </div>

                </div>

                <div style={{ margin: "2rem 1rem" }}>
                    <h5>Lista de Clientes a liquidar</h5>
                    <Functionalitiesbtn
                        buttons={btnCreated}
                        listAvailable={""}
                        aditional={() => { return <h5>Liquidacion:  {codLiq}</h5> }}
                    />
                    <div>
                        <TableLiquidationSeller
                            data={invoiceLiquidation}
                            modaltransaccionPay={modaltransaccionPay}
                            seller={sellerByLiqui}
                            handleAddInvoice={handleAddInvoice}
                            checkSelectedID={checkSelectedID} />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", width: "1000px", margin: "0 auto", justifyContent: "space-between" }}>
                    <div>
                        <h5>Total Descuentos: $   {(discount?.total_other) ? (discount?.total_other) : (0).toFixed(2)}</h5>
                        <h5>Total Gastos: $   {(expenses?.total) ? (expenses?.total) : (0).toFixed(2)}</h5>
                        <h5>Total Dinero: $       {(cash?.total) ? (cash?.total) : (0).toFixed(2)}</h5>
                        <h5>Total: $ {totalVendedor || "$ 0.00"}</h5>
                    </div>
                    <div>
                        <h2>Total Cobrado: $     {(sumTotalCobrado).toFixed(2)}</h2>
                        <h5 style={{ color: `${cuadre > 0 ? "#FFAC42" : cuadre < 0 ? "#C20114" : "#02B875"}` }}>Cuadre: $ {cuadre} </h5>
                        <span style={{ color: `${cuadre > 0 ? "#FFAC42" : cuadre < 0 ? "#C20114" : "#02B875"}` }}>
                            {cuadre > 0 ?
                                `El Vendedor ${sellerLiqui[0]?.name} tiene un saldo a Favor` :
                                cuadre < 0 ?
                                    `El Vendedor ${sellerLiqui[0]?.name} tiene un saldo en Contra` :
                                    `La liquidacion del ${sellerLiqui[0]?.name} es Correcta`}
                        </span>
                    </div>
                </div>
                <div style={{ display: "flex", margin: "4rem 0", gap: "2rem", justifyContent: "center" }}>
                    <Expenses
                        codLiq={codLiq}
                        typeLiquidation={"seller"}
                        receptedExpenses={receptedExpenses}
                        codeExpeLocalStorage={codeExpeLocalStorage} />

                    <Discount
                        codLiq={codLiq}
                        typeLiquidation={"seller"}
                        receptedDiscount={receptedDiscount}
                        codeDiscountLocalStorage={codeDiscountLocalStorage} />

                    <Cash
                        codLiq={codLiq}
                        typeLiquidation={"seller"}
                        checkmoney={checkMoney}
                        receptedCash={receptedCash}
                        codeCheckLocalStorage={codeCheckLocalStorage}
                        codeCashLocalStorage={codeCashLocalStorage} />
                </div>

                <div className='btn-liquidation'>
                    <Button style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
                        onClick={cancelLiquidation} variant="danger">
                        <i className="fa-regular fa-circle-xmark bx-fw"></i>
                        Cancelar Liquidacion
                    </Button>

                    <Button style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
                        onClick={imprimirContenido} variant="outline-info">
                        <i className="fa-solid fa-print bx-fw"></i>
                        Imprimir
                    </Button>

                    <Button style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} variant="success"
                        onClick={liquidar}>
                        <i className="fa-solid fa-circle-check bx-fw"></i>
                        Liquidar e Imprimir
                    </Button>
                </div>
                {/* //TODO: Revisar codigo sobre el error en transactionfun*/}

                <ModalTransaccion
                    datatransac={transaction}
                    data={itemTableliqui}
                    user={userLiquidador.id}
                    show={modalTransaccionPay}
                    onHide={() => { setModalTransaccionPay(false) }}
                    transactionfun={transactionpay}
                />

                <Modalagginvoice data={invoice}
                    showAggInvoice={showAggInvoice}
                    setShowAggInvoice={setShowAggInvoice}
                    aggInvoice={aggInvoice} />

            </div>
        </div>
    );
};

export default Liquidationsell;