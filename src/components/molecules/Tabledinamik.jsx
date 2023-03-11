import React, { useEffect, useRef, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { getInvoiceThunk } from "../../store/slices/invoice.slice";
import date from "../../utils/date";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import imgEliminar from "../../img/eliminar.gif"
import imgActualizar from "../../img/actualizar.gif"

const Tabledinamik = ({ invoice, seller, customer, createInvo, delInvo, updateInvo, refresh, liquidationAct }) => {

  const [data, setData] = useState(invoice);
  useEffect(() => {
    setData(invoice)
    console.log("actualizando informacion table dinamik");
  }, [refresh, invoice])

  /********************************* Busqueda de CLiente *******************************/
  const [activeListSearchCustomer, setActiveListSearchCustomer] = useState(false)
  const [activeUpdateCustomer, setActiveUpdateCustomer] = useState(false)
  const [searchCustomer, setSearchCustomer] = useState("");
  const filteredList = customer.filter((item) =>
    item.nombre.toLowerCase().includes(searchCustomer.toLowerCase()) || (item.dni).includes(searchCustomer)
  );
  const handleSearchCustomerChange = (event) => {
    setSearchCustomer(event.target.value);
  };
  const handleItemCustomerClick = (item) => {
    const { id, nombre } = item;
    if (editMode === true) {
      setEditData(prevState => ({
        ...prevState,
        id_client: id
      }));
      setSearchCustomer(`${id} - ${nombre}`);
      setActiveUpdateCustomer(false);
      // alert(item.id + " " + item.nombre);
    } else {
      setFormData(prevState => ({
        ...prevState,
        id_client: id
      }));
      setSearchCustomer(`${id} - ${nombre}`);
      setActiveListSearchCustomer(false);
      // alert(item.id + " " + item.nombre);

    }
  };
  /*************************************************************************************/




  /*************************   Totales de Liquidacion **********************************/

  //Total del saldo a cobrar
  const sumTotalFact = Object.values(data).reduce((accumulator, currentValue) => accumulator + currentValue.saldo, 0);

  /**********************************************************************************/



  /*************************   Editar - Crear Tablas **********************************/
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    id_client: "",
    num_Fact: "",
    isWhite: false,
    status: "pendiente",
    fecha_entrega: date.Currendate(),
    total_fact: "",
    saldo: 0,
    detalle_adt: "",
    id_sellers: seller[0]?.id
  });

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name);
    if (name === "id_client") {
      setSearchCustomer(value);
      console.log(name);
    }
    if (name === "total_fact") {
      console.log(name + " " + value);
      if (value.length !== 0) {
        setFormData(prevState => ({
          ...prevState,
          [name]: parseFloat(value)
        }));
        setError(null);
      } else {
        // const message = "no puede dejar este campo vacio"
        setError("total_fact")
      }

    }

    if (name === "num_Fact") {
      if (value.length > 13) {
        // const message = "no puede ingresar mas de 13 digitos"
        setError("num_Fact")
      } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
        setError(null)
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleChangeUpdate = e => {
    const { name, value } = e.target;
    if (name === "num_Fact") {
      if (value.length > 13) {
        const message = "no puede ingresar mas de 13 digitos"
        setError(<p style={{
          fontSize: "14px", position: "absolute", padding: "5px", border: "2px solid red", borderRadius: "5px", backgroundColor: "#fff",
        }}>Error {message}</p>)
      } else {
        setEditData(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    } else {
      console.log(name + " " + value);
      setEditData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
    console.log(editData);
  };

  const handleAdd = () => {
    console.log(error);
    if (error === null && formData.total_fact.length !== 0) {
      delete formData.id;
      formData.saldo = formData.total_fact;
      createInvo(formData);
      console.log(formData);
      setEditingIndex(null);
      setSearchCustomer("");
      inputRef.current.focus();
      setFormData({
        id: "",
        id_client: customer[0]?.id,
        num_Fact: "",
        isWhite: false,
        status: "pendiente",
        fecha_entrega: date.Currendate(),
        total_fact: "",
        saldo: 0,
        detalle_adt: "",
        id_sellers: seller[0]?.id
      });
    } else {
      setError("total_fact")
      alert("Existe un campo con error")
    }

  };

  const handleEdit = (index, item) => {
    if (item) {
      setEditingIndex(index)
      setEditMode(true);
      setEditData(item);
    }
  };
  const handleupdate = () => {
    return (
      <div>
        <Modal.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
          <h6>Deseas Actualizar con nuevos datos esta Factura.</h6>
          <img style={{ width: "100px" }} src={imgActualizar} alt="Actualizar" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleClose(); setEditingIndex(null); }}>
            No
          </Button>
          <Button variant="primary" onClick={() => { updateInvo(editData); handleClose(); setEditingIndex(null); }}>
            Si
          </Button>
        </Modal.Footer>
      </div>
    )
  };

  const handleDelete = () => {
    return (
      <div>
        <Modal.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
          <h6>Deseas eliminar esta Factura.</h6>
          <img style={{ width: "100px" }} src={imgEliminar} alt="Eliminar" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => { delInvo(deleteData); handleClose(); setDeleteData(null); }}>
            Si
          </Button>
        </Modal.Footer>
      </div>
    )
  };

  /**********************************************************************************/


  return (
    <div>
      <Table striped bordered hover style={{ maxWidth: "1305px", fontSize: "12px", textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ maxWidth: "50px" }}>select</th>
            <th style={{ maxWidth: "50px" }}>ID</th>
            <th style={{ maxWidth: "185px" }}>Cliente</th>
            <th style={{ maxWidth: "150px" }}># Factura</th>
            <th style={{ maxWidth: "100px" }}>N. Venta</th>
            <th style={{ maxWidth: "150px" }}>Estatus</th>
            <th style={{ maxWidth: "100px" }}>Fecha Entrega</th>
            <th style={{ maxWidth: "125px" }}>Total</th>
            <th style={{ maxWidth: "125px" }}>Saldo</th>
            <th style={{ maxWidth: "125px" }}>Detalle</th>
            <th style={{ maxWidth: "175px" }}>Vendedor</th>
            <th >Accion</th>
          </tr>
        </thead>
        <tbody >

          {
            liquidationAct !== true ?
              (<tr >
                <td>
                  {/*Aqui se ubica el checkBox */}

                </td>
                <td>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="id"
                    value={formData.id}
                    disabled={true}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input name="id_client" className="form-control form-control-sm" ref={inputRef}
                    style={{ fontSize: "13px", minWidth: "110px" }}
                    type="text" value={editMode ? '' : searchCustomer}
                    onClick={() => setActiveListSearchCustomer(true)}
                    onChange={handleSearchCustomerChange} />

                  <ListGroup className={activeListSearchCustomer && searchCustomer.length > 0 ? `listClient` : `none`} >
                    {filteredList.map((item) => (
                      <option className={activeListSearchCustomer ? `` : `none`}
                        key={item.id} value={item.id} onClick={() => { handleItemCustomerClick(item) }} >{item.id} - {item.nombre} </option>
                    ))}
                  </ListGroup>

                </td>

                <td>
                  <input
                    style={{ fontSize: "13px", minWidth: "110px" }}
                    placeholder="001-000000001"
                    className="form-control form-control-sm"
                    type="text"
                    name="num_Fact"
                    value={formData.num_Fact}
                    onChange={handleChange}
                  />
                  {error === "num_Fact" ? (<p style={{
                    fontSize: "10px", position: "absolute",
                    padding: "5px", border: "2px solid red",
                    borderRadius: "5px", backgroundColor: "#fff",
                    fontFamily: "var(--paragraph-text)"
                  }}>Error {"no puede ingresar mas de 13 digitos"}</p>) : null}
                </td>

                <td>
                  <select name="isWhite"
                    className="form-select h-25"
                    style={{ padding: "3px", paddingRight: "40px" }}
                    value={formData.isWhite}
                    onChange={handleChange}        >
                    <option value={(false)}>No</option>
                    <option value={(true)}>Si</option>
                  </select>
                </td>

                <td>
                  <select name="status"
                    className="form-select h-25"
                    style={{ padding: "3px", paddingRight: "40px" }}
                    value={formData.status}
                    onChange={handleChange}        >
                    <option value="pendiente">Pendiente</option>
                    <option value="abonada">Abonada</option>
                    <option value="pagada">Pagada</option>
                  </select>
                </td>

                <td>
                  <input
                    className="form-control form-control-sm"
                    type="date"
                    name="fecha_entrega"
                    value={formData.fecha_entrega}
                    onChange={handleChange}
                  />
                </td>

                <td >
                  <div className="input-group mb-3" style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
                    <span className="input-group-text" style={{ padding: "3px", paddingRight: "5px", paddingLeft: "5px" }}>$</span>
                    <input
                      aria-label="Amount (to the nearest dollar)"
                      className="form-control form-control-sm"
                      style={{ padding: "3px" }}
                      type="text"
                      name="total_fact"
                      value={(formData.total_fact)}
                      onChange={handleChange}
                    />
                  </div>

                  {error === "total_fact" ? (<p style={{
                    fontSize: "10px", position: "absolute",
                    padding: "5px", border: "2px solid red",
                    borderRadius: "5px", backgroundColor: "#fff",
                    fontFamily: "var(--paragraph-text)"
                  }}>Error {"No puede guardar la factura sin llenar el campo Total"}</p>) : null}
                </td>

                <td >
                  <div className="input-group mb-3w" style={{ display: "flex", flexDirection: "row" }}>
                    <span className="input-group-text" style={{ padding: "3px", paddingRight: "5px", paddingLeft: "5px" }}>$</span>
                    <input
                      aria-label="Amount (to the nearest dollar)"
                      className="form-control form-control-sm"
                      style={{ padding: "3px" }}
                      type="text"
                      name="saldo"
                      disabled={true}
                      value={formData.total_fact}
                      onChange={handleChange}
                    />
                  </div>
                </td>

                <td>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="detalle_adt"
                    value={formData.detalle_adt}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <select name="id_sellers"
                    className="form-select h-25"
                    style={{ padding: "3px", paddingRight: "40px" }}
                    value={(formData.id_sellers)}
                    onChange={handleChange}  >
                    <option >Select Seller</option>
                    {
                      seller?.map((sell, index) => (
                        <option key={index} value={(parseInt(sell.id))}>{sell.id} - {sell.nombre}</option>
                      ))
                    }
                  </select>
                </td>

                <td>
                  <button onClick={handleAdd}
                    className="btn btn-primary m-1 p-1 d-flex flex-row">
                    <i className={`fa-solid ${editMode ? "fa-floppy-disk" : "fa-circle-plus"}  bx-fw`}></i>
                    {editMode ? ("Guardar") : ("Agregar")}
                  </button>
                </td>
              </tr>) : ""
          }

          {
            data?.map((item, index) => (
              <tr key={index} >
                {/* chekbox */}
                {
                  <td>
                    <input type="checkbox" name="" id="" />
                  </td>
                }
                {/* id */}
                {editingIndex === index ?
                  <td>
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      name="id"
                      value={editData?.id}
                      disabled={true}
                      onChange={handleChangeUpdate}
                    />
                  </td>
                  : <td>{item?.id}</td>}

                {/* idclient */}
                {editingIndex === index ?//Revisar codigo
                  <td>
                    {/* <select name="id_client"
                    className="form-select h-25"
                    style={{ padding: "3px", paddingRight: "40px" }}
                    value={editData.id_client}
                    onChange={handleChangeUpdate}  >
                    <option value={editData.id_client_bill.id}>{editData.id_client_bill.id} - {editData.id_client_bill.nombre}</option>
                    {
                      customer?.map((cust, index) => (
                        <option key={index} value={parseInt(cust.id)}>{cust.id} - {cust.nombre}</option>
                      ))
                    }
                  </select> */}

                    <input name="id_client" className="form-control form-control-sm"
                      type="text" value={searchCustomer}
                      onChange={handleSearchCustomerChange} onClick={() => { activeUpdateCustomer ? setActiveUpdateCustomer(false) : setActiveUpdateCustomer(true) }} />

                    <ListGroup className={activeUpdateCustomer ? `listClient` : `none`}  >
                      {filteredList.map((item) => (
                        <option className={activeUpdateCustomer ? `` : `none`}
                          key={item.id} value={item.id} onClick={() => { handleItemCustomerClick(item) }} >{item.id} - {item.nombre} </option>
                      ))}
                    </ListGroup>
                  </td>
                  : <td>{item?.id_client_bill?.nombre}</td>}


                {/* fact */}
                {editingIndex === index ?
                  <td>
                    <input
                      placeholder="001-001-000000001"
                      className="form-control form-control-sm"
                      type="text"
                      name="num_Fact"
                      value={editData?.num_Fact}
                      onChange={handleChangeUpdate}
                    />
                    {error}
                  </td>
                  : <td>{item?.num_Fact}</td>}

                {/* is white */}
                {editingIndex === index ?
                  <td>
                    <select name="isWhite"
                      className="form-select h-25"
                      style={{ padding: "3px", paddingRight: "40px" }}
                      value={editData?.isWhite}
                      onChange={handleChangeUpdate} >
                      <option value={false}>No</option>
                      <option value={true}>Si</option>
                    </select>
                  </td>
                  : <td>{item?.isWhite === true ? "Si" : "No"}</td>}

                {/* status */}
                {editingIndex === index ?
                  <td>
                    <select name="status"
                      className="form-select h-25"
                      style={{ padding: "3px", paddingRight: "40px" }}
                      value={editData?.status}
                      onChange={handleChangeUpdate}        >
                      <option value="pendiente">Pendiente</option>
                      <option value="abonada">Abonada</option>
                      <option value="pagada">Pagada</option>
                    </select>
                  </td>
                  : <td>{item?.status}</td>}

                {/* fecha */}
                {editingIndex === index ?
                  <td>
                    <input
                      className="form-control form-control-sm"
                      type="date"
                      name="fecha_entrega"
                      value={editData?.fecha_entrega}
                      onChange={handleChangeUpdate}
                    />
                  </td>
                  : <td>
                    <h6 className={item?.saldo === 0 ? "dateSaldoCero" : (date.DatePastPresent(item?.fecha_entrega) >= 30 ? "dateRed" :
                      date.DatePastPresent(item?.fecha_entrega) >= 15 ? "dateYellow" : "dateGreen")}
                    >
                      {`(${date.DatePastPresent(item?.fecha_entrega)})`}  {item?.fecha_entrega}
                    </h6>

                  </td>}

                {/* total */}
                {editingIndex === index ?
                  <td >
                    <div className="input-group mb-3w" style={{ display: "flex", flexDirection: "row" }}>
                      <span className="input-group-text" style={{ padding: "3px", paddingRight: "15px", paddingLeft: "15px" }}>$</span>
                      <input
                        aria-label="Amount (to the nearest dollar)"
                        className="form-control form-control-sm"
                        style={{ padding: "3px" }}
                        type="text"
                        name="total_fact"
                        value={editData?.total_fact}
                        onChange={handleChangeUpdate}
                      />
                    </div>
                  </td>
                  : <td>{(item?.total_fact?.toFixed(2))}</td>}

                {/* saldo */}
                {editingIndex === index ?
                  <td >
                    <div className="input-group mb-3w" style={{ display: "flex", flexDirection: "row" }}>
                      <span className="input-group-text" style={{ padding: "3px", paddingRight: "15px", paddingLeft: "15px" }}>$</span>
                      <input
                        aria-label="Amount (to the nearest dollar)"
                        className="form-control form-control-sm"
                        style={{ padding: "3px" }}
                        type="text"
                        name="saldo"
                        disabled={true}
                        value={editData?.saldo}
                        onChange={handleChangeUpdate}
                      />
                    </div>
                  </td>
                  : <td >{item?.saldo?.toFixed(2)}</td>}

                {/* detall */}
                {editingIndex === index ?
                  <td>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="detalle_adt"
                      value={editData?.detalle_adt}
                      onChange={handleChangeUpdate}
                    />
                  </td>
                  : <td>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item?.detalle_adt}</Tooltip>}>
                      <span className="d-inline-block">
                        <div style={{ textAlign: "center", border: "2px solid var(--first-color)", pointerEvents: 'none' }}>
                          Ver Detalle
                        </div>
                      </span>
                    </OverlayTrigger>
                  </td>}

                {/* seller */}
                {editingIndex === index ?
                  <td>
                    <select name="id_sellers"
                      className="form-select h-25"
                      style={{ padding: "3px", paddingRight: "40px" }}
                      value={editData.id_sellers}
                      onChange={handleChangeUpdate}  >

                      <option value={editData.id_seller_client.id}>{editData.id_seller_client.id} - {editData.id_seller_client.nombre}</option>
                      {
                        seller?.map((sell, index) => (
                          <option key={index} value={parseInt(sell.id)}>{sell.id} - {sell.nombre}</option>
                        ))
                      }
                    </select>
                  </td>
                  : <td>{item?.id_seller_client?.nombre}</td>}

                {/*Botones*/}
                <td>
                  {
                    liquidationAct !== true ?
                      (editingIndex !== index ?
                        (<div style={{ display: "flex", flexDirection: "row" }}>
                          <button
                            className="btn btn-primary m-1 p-1 d-flex flex-row"
                            onClick={() => handleEdit(index, item)}>
                            <i className="fa-solid fa-pen-to-square bx-fw"></i>-
                          </button>
                          <button
                            className="btn btn-danger m-1 p-1 d-flex flex-row"
                            style={{ alignItems: 'center' }}
                            onClick={() => { setDeleteData(item?.id); handleShow(); }}>
                            <i className="fa-solid fa-trash-can bx-fw"></i>
                          </button>
                        </div>)
                        : <div style={{ display: "flex", flexDirection: "row" }}>
                          <button
                            className="btn btn-success m-1 p-1 d-flex flex-row"
                            onClick={handleShow}>
                            <i className="fa-solid fa-floppy-disk bx-fw"></i>
                            {"Guardar"}
                          </button>
                          <button type="button" className="btn btn-warning m-1 p-1 d-flex flex-row" style={{ alignItems: 'center' }} onClick={() => setEditingIndex(null)}>
                            <i className="fa-solid fa-xmark bx-fw"></i>
                          </button>
                        </div>) : ( //AQui ingresamos la opcion para pagar o abonar factura
                        <div>
                          hola
                        </div>
                      )

                  }
                </td>
              </tr>
            ))
          }

          <tr>
            <td ></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><h6>TOTAL:</h6></td>
            <td><h6>{sumTotalFact?.toFixed(2)}</h6></td>
            <td>a</td>
            <td>a</td>
          </tr>

        </tbody>

      </Table>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmacion</Modal.Title>
        </Modal.Header>
        {
          deleteData === null ? handleupdate() : handleDelete()
        }
      </Modal>

    </div >
  );
};

export default Tabledinamik;