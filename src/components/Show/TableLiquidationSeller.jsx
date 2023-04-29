import React from "react";
import Table from 'react-bootstrap/Table';
import date from "../../utils/date";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";



const TableLiquidationSeller = ({ handleAddInvoice, checkSelectedID, modaltransaccionPay, data }) => {


    const dispatch = useDispatch();
    const { id: sellerByLiqui } = useParams();
    const invoice = useSelector(state => state.invoice);
    const vehicles = useSelector(state => state.vehicles);
    const vehActive = vehicles.filter(veh => veh?.isActive === true);


    return (
        <div className="tables-view">
            <Table striped bordered hover responsive style={{ width: "1400px", fontSize: "12px", textAlign: "center" }}>
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
                        <th style={{ width: "125px", background: "#D3E0FF" }}>Pago</th>
                        <th style={{ width: "125px", background: "#D3E0FF" }}>Accion</th>
                        <th style={{ width: "125px", background: "#D3E0FF" }}>Cobro Vehiculo</th>
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

                            <td style={{ width: "120px", fontSize: "14px" }}>
                                $ {item?.pago ? (parseFloat(item?.pago)).toFixed(2) : 0}
                            </td>

                            <td className='tdBtn' style={{ maxWidth: "145px" }}>
                                <button type="button" className="btn btn-success btn-actions" onClick={() => modaltransaccionPay(item)}>
                                    <i className='bx bx-dollar-circle bx-lg '></i>
                                </button>
                            </td>

                            <td>
                                <select style={{width:"90px"}} name="" id="">
                                    {
                                        vehActive?.map((veh, index) => (
                                            <option key={index} value={veh?.id} >{(veh?.driver)?.substring(0, 20)}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TableLiquidationSeller;