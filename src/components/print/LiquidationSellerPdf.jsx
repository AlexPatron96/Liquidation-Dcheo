import React, { useEffect, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';
// import Pdfliqveh from '../../../../components/atom/Pdfliqveh';

// import { PDFViewer, PDFDownloadLink, BlobProvider, Document, Page, Text } from '@react-pdf/renderer';
// import { saveAs } from "file-saver";
// import ReactPDF from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import axios from "axios";


const LiquidationSellerPdf = () => {
    const elementoRef = useRef(null);


    const data = JSON.parse(sessionStorage.getItem("printSeller"));
    const checkMoney = data?.[11];
    const discount = data?.[1];
    const expenses = data?.[2];
    const cash = data?.[3];
    const transaction = data?.[4];
    const invoice = data?.[5];
    const codLiq = data?.[6];
    const user = data?.[7];
    const date = data?.[8];
    const seller = data?.[9];
    const principal = data?.[10];

    console.log(checkMoney);
    console.log(data);

    // const balanceGenCal = (parseFloat(principal?.balance_gen_sell) + parseFloat(principal?.balance));

    useEffect(() => {
        window.print();
    }, [])

    const generatePDF = () => {
        const input = document.getElementById('component-to-pdf');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'l',
                    unit: 'cm',
                    format: 'a4'
                });
                pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
                pdf.save('component.pdf');
            });
    };

    const sectionRef = useRef(null);

    return (
        <div>
            <button onClick={generatePDF}>pdf</button>
            <div id="component-to-pdf" ref={sectionRef} >

                {/* style={{ width: "8.5in", height: "11in", position: "relative" }} */}

                <h3 style={{ textAlign: "center" }}>LIQUIDACION</h3>
                <h4 style={{ textAlign: "center" }}>Distribuidora DCheo</h4>
                <h4>Liquidacion de Vendedores</h4>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <h5>Usuario: <span style={{ color: "#02B875" }}> {user} </span> </h5>
                        <h5>Fecha de liquidacion: <span style={{ color: "#02B875" }}>{date} </span> </h5>
                        <h5>Se esta liquidando al Vendedor: <span style={{ color: "#02B875" }}> {seller}</span>  </h5>
                        <h5>Codigo de Liquidacion: <span style={{ color: "#02B875" }}> {codLiq}</span>  </h5>
                    </div>

                    <div style={{ border: "2px solid grey", width: "225px", height: "150px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <h5 style={{ fontSize: "50px", color: `${principal?.balance_gen_sell > 0 ? "#02B875" : principal?.balance_gen_sell < 0 ? "#C20114" : "#02B875"}` }}>
                            {principal?.balance_gen_sell > 0 ?
                                'A FAVOR' :
                                principal?.balance_gen_sell < 0 ?
                                    'EN CONTRA' :
                                    'OK'}
                        </h5>
                        <h5>${principal?.balance_gen_sell}</h5>
                    </div>
                </div>

                <div id="contenido-a-imprimir" ref={elementoRef} style={{ margin: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>

                        <Table striped bordered hover style={{ width: "1000px" }}>
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
                                            <td style={{ borderRight: `4px solid ${(inv?.pass || parseFloat(inv?.pago)) ? "#02B875" : "#FFCCE5"} ` }}>$ {(parseFloat(inv?.pass)) || (parseFloat(inv?.pago)) || 0}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <div style={{ textAlign: "center" }}>
                            <div>
                                <h4>Total Cobrado</h4>
                                <h5>$ {principal?.total_collection_bills}</h5>
                            </div>
                            <div>
                                <h4>Total Recibido</h4>
                                <h5>$ {principal?.total_received}</h5>
                            </div>
                            <div>
                                <h4>Cuadre</h4>
                                <h5>${principal?.balance}</h5>
                                <span style={{ color: `${principal?.balance > 0 ? "#FFAC42" : principal?.balance < 0 ? "#C20114" : "#02B875"}` }}>
                                    {principal?.balance > 0 ?
                                        `El Vendedor ${seller} tiene un saldo a Favor` :
                                        principal?.balance < 0 ?
                                            `El Vendedor ${seller} tiene un saldo en Contra` :
                                            `La liquidacion del ${seller} es Correcta`}
                                </span>
                            </div>

                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", gap: "3rem" }}>

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

                    </div>



                    <div style={{ marginTop: "1rem" }}>
                        <h4>
                            Depositos o Cheques
                        </h4>
                        <Table striped bordered hover style={{ width: "1000px" }}>
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Receptor</th>
                                    <th># Doc</th>
                                    <th>Banco</th>
                                    <th>Tipo Doc</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: "12px" }}>

                                {
                                    checkMoney?.map((check, index) => (
                                        <tr key={index}>
                                            <td>{check?.id_client || check?.check_sell?.id_client_client?.fullname}</td>
                                            <td>{check?.references || check?.check_sell?.references}</td>
                                            <td>{check?.number_check || check?.check_sell?.number_check}</td>
                                            <td>{check?.id_bank || check?.check_sell?.id_bank_bank?.name_bank}</td>
                                            <td>{check?.type || check?.check_sell?.type}</td>
                                            <td>$ {(check?.total) || check?.check_sell?.total}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <span style={{ whiteSpace: "pre-wrap" }}>
                            {principal?.detail}
                        </span>
                    </div>
                </div>
                <div>
                    <button style={{ border: "none", background: "none" }} onClick={() => { window.close() }}>CLOSE</button>
                </div>
            </div>
        </div>
    );
};

export default LiquidationSellerPdf;