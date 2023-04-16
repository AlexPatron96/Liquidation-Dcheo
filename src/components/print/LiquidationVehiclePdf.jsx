import React, { useEffect, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSellerThunk } from "../../store/slices/seller.slice";

const LiquidationVehiclePdf = () => {
    const { id: idVehicleByLiqui } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        // window.print();
        dispatch(getSellerThunk());
    }, [])

    const seller = useSelector(state => state.seller);
    const data = JSON.parse(sessionStorage.getItem("printVehicle" + idVehicleByLiqui));
    const checkMoney = data?.[8];
    const discount = data?.[1];
    const expenses = data?.[2];
    const cash = data?.[3];
    const productReturn = data?.[4];
    const productReturnInvoice = data?.[5];
    const transaction = data?.[6];
    const invoice = data?.[7];
    const sellerDeliverCred = data?.[9];
    const codLiq = data?.[10];
    const user = data?.[11];
    const date = data?.[12];
    const vehicle = data?.[13];
    const principal = data?.[14];

    return (
        <div>
            <h3 style={{ textAlign: "center" }}>LIQUIDACION</h3>
            <h4 style={{ textAlign: "center" }}>Distribuidora DCheo</h4>
            <h4>Liquidacion de Vehiculos de entrega</h4>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h5>Usuario: <span style={{ color: "#02B875" }}> {user} </span> </h5>
                    <h5>Fecha de liquidacion: <span style={{ color: "#02B875" }}>{date} </span> </h5>
                    <h5>Se esta liquidando al Vehiculo: <span style={{ color: "#02B875" }}> {vehicle}</span>  </h5>
                    <h5>Codigo de Liquidacion: <span style={{ color: "#02B875" }}> {codLiq}</span>  </h5>
                </div>

                <div style={{ border: "2px solid grey", width: "225px", height: "150px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    <h5 style={{ fontSize: "50px", color: `${principal?.balance > 0 ? "#02B875" : principal?.balance < 0 ? "#C20114" : "#02B875"}` }}>
                        {principal?.balance > 0 ?
                            'A FAVOR' :
                            principal?.balance < 0 ?
                                'EN CONTRA' :
                                'OK'}
                    </h5>
                    <h5>
                        $ {principal?.balance}
                    </h5>
                </div>
            </div>
            <div style={{ margin: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>

                    <Table striped bordered hover size="sm" style={{ width: "700px" }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cliente</th>
                                <th># Documento</th>
                                <th>Total</th>
                                <th>Saldo</th>
                                <th>Abono</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: "12px" }}>
                            {
                                invoice?.map((inv, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{inv?.client?.fullname || inv?.id_bills_bill.client?.fullname}</td>
                                        <td>{inv?.num_bill || inv?.id_bills_bill.num_bill}</td>
                                        <td>$ {(((inv?.total_bill)) || inv?.id_bills_bill.total_bill)}</td>
                                        <td>$ {((parseFloat(inv?.balance))) || inv?.id_bills_bill.balance}</td>
                                        <td style={{ borderRight: `4px solid ${inv?.pago ? "#02B875" : "#FFCCE5"} ` }}>$ {(parseFloat(inv?.pago)) || 0}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <div style={{ display: "flex", gap: "1rem", flexDirection: "row", width: "800px" }}>

                        <div style={{width:"180px"}}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>T. Descuento: </span>
                                <span>$ {parseFloat(discount?.total_other).toFixed(2)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>T. Productos: </span>
                                <span>$ {parseFloat(productReturn?.total).toFixed(2)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>T. Gastos: </span>
                                <span>$ {parseFloat(expenses?.total).toFixed(2)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>T. Dinero: </span>
                                <span>$ {parseFloat(cash?.total).toFixed(2)}</span>
                            </div>

                            <div>
                                <div style={{ border: "1px solid var(--first-color) ", borderRadius: "5px" }}>
                                    Creditos Entregados
                                    {
                                        sellerDeliverCred.map((sell, index) => (
                                            <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span>{(seller.filter(seller => seller.id === parseInt(sell?.id_seller))[0]?.code)} :</span>
                                                {/* <h5>{console.log(seller)} :</h5> */}

                                                <span> ${parseFloat(sell?.total).toFixed(2)}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Total: </span>
                                <h5>$ {parseFloat(principal?.total_received).toFixed(2)}</h5>
                            </div>
                        </div>

                        <div style={{width:"180px"}}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>T. Cobrado: </span>
                                <span>$ {parseFloat(principal?.total_collection_bills).toFixed(2)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Caja Chica</span>
                                <span>$ {principal?.box_small}</span>
                            </div>
                            <div>
                                <div style={{ border: "1px solid var(--first-color) ", borderRadius: "5px" }}>
                                    Ventas
                                    {
                                        sellerDeliverCred.map((sell, index) => (
                                            <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span>{(seller.filter(seller => seller.id === parseInt(sell?.id_seller))[0]?.code)} :</span>
                                                {/* <h5>{console.log(seller)} :</h5> */}

                                                <span> ${parseFloat(sell?.sales).toFixed(2)}</span>
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Total:</span>
                                <h5>${principal?.total_sent}</h5>
                            </div>

                        </div>

                        <div style={{width:"180px" , textAlign: "center" }}>
                            <h4>Cuadre</h4>
                            <h5>${principal?.balance}</h5>
                            <span style={{ color: `${principal?.balance > 0 ? "#FFAC42" : principal?.balance < 0 ? "#C20114" : "#02B875"}`, fontSize: "12px" }}>
                                {principal?.balance > 0 ?
                                    `El Vehiculo de entrega conducido por ${vehicle} tiene un saldo a Favor` :
                                    principal?.balance < 0 ?
                                        `El Vehiculo de entrega conducido por ${vehicle} tiene un saldo en Contra` :
                                        `La liquidacion de el Vehiculo de entrega conducido por ${vehicle} es Correcta`}
                            </span>
                        </div>
                    </div>
                </div>


                <div style={{ display: "flex", flexDirection: "row", gap: "1.75rem" }}>

                    <div style={{ width: "250px", height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <h4>Dinero</h4>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-barcode bx-fw"></i>
                                Cod:
                            </div>
                            <div style={{ fontSize: "12px" }}>
                                {((cash?.settlement_code))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-coins bx-fw"></i>
                                Monedas:
                            </div>
                            <div>
                                $ {(parseFloat(cash?.coin).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-regular fa-money-bill-1 bx-fw"></i>
                                Billetes:
                            </div>
                            <div>
                                $ {(parseFloat(cash?.money).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-receipt bx-fw"></i>
                                Depositos:
                            </div>
                            <div>
                                $ {(parseFloat(cash?.deposits_money).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-money-check bx-fw"></i>
                                Cheques:
                            </div>
                            <div>
                                $ {(parseFloat(cash?.check_money).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-brands fa-stack-overflow bx-fw"></i>
                                Total:
                            </div>
                            <div>
                                $ {(parseFloat(cash?.total).toFixed(2))}
                            </div>
                        </div>

                        {/* <div style={{ display: "flex", flexDirection: "column" }}>
                            
                            Detalle:
                            <div style={{ border: "2px solid grey", height: "100px", fontSize: "11px" }}>
                                {cash?.detail}
                            </div>
                        </div> */}

                    </div>

                    <div style={{ width: "250px", height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <h4>Gastos</h4>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-barcode bx-fw"></i>
                                Cod:
                            </div>
                            <div style={{ fontSize: "12px" }}>
                                {((expenses?.settlement_code))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-utensils bx-fw"></i>
                                Alimentos:
                            </div>
                            <div>
                                $ {(parseFloat(expenses?.feeding).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-car  bx-fw"></i>
                                Viaticos:
                            </div>
                            <div>
                                $ {(parseFloat(expenses?.perdiem).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-gas-pump bx-fw"></i>
                                Combustible:
                            </div>
                            <div>
                                $ {(parseFloat(expenses?.fuel).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-brands fa-stack-overflow bx-fw"></i>
                                Total:
                            </div>
                            <div>
                                $ {(parseFloat(expenses?.total).toFixed(2))}
                            </div>
                        </div>

                        {/* <div style={{ display: "flex", flexDirection: "column" }}>
                            
                            Detalle:
                            <div style={{ border: "2px solid grey", height: "100px", fontSize: "11px" }}>
                                {expenses?.detail}
                            </div>
                        </div> */}

                    </div>

                    <div style={{ width: "250px", height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <h4>Descuentos</h4>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-barcode bx-fw"></i>
                                Cod:
                            </div>
                            <div style={{ fontSize: "12px" }}>
                                {((discount?.settlement_code))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-tags bx-fw"></i>
                                Descuentos:
                            </div>
                            <div>
                                $ {(parseFloat(discount?.total_discount).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-retweet bx-fw"></i>
                                Retenciones:
                            </div>
                            <div>
                                $ {(parseFloat(discount?.retention).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-brands fa-stack-overflow bx-fw"></i>
                                Total:
                            </div>
                            <div>
                                $ {(parseFloat(discount?.total_other).toFixed(2))}
                            </div>
                        </div>

                        {/* <div style={{ display: "flex", flexDirection: "column" }}>
                            
                            Detalle:
                            <div style={{ border: "2px solid grey", height: "100px", fontSize: "11px" }}>
                                {discount?.detail}
                            </div>
                        </div> */}

                    </div>

                    <div style={{ width: "250px", height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <h4>Productos</h4>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-solid fa-barcode bx-fw"></i>
                                Cod:
                            </div>
                            <div style={{ fontSize: "12px" }}>
                                {((productReturn?.settlement_code))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i class="fa-solid fa-house-crack bx-fw"></i>
                                Dañados:
                            </div>
                            <div>
                                $ {(parseFloat(productReturn?.disrepair).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i class="fa-solid fa-business-time bx-fw"></i>
                                Caducados:
                            </div>
                            <div>
                                $ {(parseFloat(productReturn?.expired).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i class="fa-solid fa-arrow-right-arrow-left bx-fw"></i>
                                Retornados:
                            </div>
                            <div>
                                $ {(parseFloat(productReturn?.rejected).toFixed(2))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <i className="fa-brands fa-stack-overflow bx-fw"></i>
                                Total:
                            </div>
                            <div>
                                $ {(parseFloat(productReturn?.total).toFixed(2))}
                            </div>
                        </div>

                        {/* <div style={{ display: "flex", flexDirection: "column" }}>
                            
                            Detalle:
                            <div style={{ border: "2px solid grey", height: "100px", fontSize: "11px" }}>
                                {discount?.detail}
                            </div>
                        </div> */}

                    </div>

                </div>



                <div style={{display:"flex", gap:"1.5rem"}}>

                    <div style={{ marginTop: "1rem" }}>
                        <h4>
                            Notas de Venta de P. R.
                        </h4>
                        <Table striped bordered hover size="sm" style={{ width: "525px" }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Client</th>
                                    <th>#Documento</th>
                                    <th>Total</th>
                                    <th>Saldo</th>
                                    <th>Vendedor</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: "12px" }}>

                                {
                                    productReturnInvoice?.map((inv, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{inv?.id_client || inv?.id_bills_bill.client?.fullname || inv?.client?.fullname}</td>
                                            <td>{inv?.num_bill || inv?.id_bills_bill.num_bill}</td>
                                            <td>$ {(((inv?.total_bill)) || inv?.id_bills_bill.total_bill)}</td>
                                            <td>$ {((parseFloat(inv?.balance))) || inv?.id_bills_bill.balance}</td>
                                            <td style={{ borderRight: `4px solid var(--first-color) ` }}>{seller.filter(seller => seller.id === parseInt(inv?.id_seller))[0]?.name || inv?.seller?.name}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                        <h4>
                            Depositos o Cheques
                        </h4>
                        <Table striped bordered hover size="sm" style={{ width: "500px" }}>
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Receptor</th>
                                    <th>#Doc</th>
                                    <th>Banco</th>
                                    <th>Tipo Doc</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: "12px" }}>

                                {
                                    checkMoney?.map((check, index) => (
                                        <tr key={index}>
                                            <td>{check?.id_client}</td>
                                            <td>{check?.references}</td>
                                            <td>{check?.number_check}</td>
                                            <td>{check?.id_bank}</td>
                                            <td>{check?.type}</td>
                                            <td>${parseFloat(check?.total).toFixed(2)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>

                </div>

                <div>
                    <span style={{ whiteSpace: "pre-wrap" }}>
                        {principal.detail}
                    </span>
                </div>




            </div>

        </div>
    );
};

export default LiquidationVehiclePdf;