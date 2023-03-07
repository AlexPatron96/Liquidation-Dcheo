import { set } from "lodash";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceThunk } from "../../store/slices/invoice.slice";
import { setSuccess } from "../../store/slices/success.slice";
import date from "../../utils/date";
import Successful from "../atom/Successful";

const Tabledinamik = ({ invoice, seller, customer, createInvo, delInvo, updateInvo, refresh }) => {

  const dispatch = useDispatch();
  const [data, setData] = useState(invoice);

  useEffect(() => {
    setData(invoice)
    console.log(refresh);
    console.log("actualizando informacion table dinamik");
  }, [refresh, invoice])

  const currentdate = date.Currendate();
  const fechaActual = new Date();
  const dia = fechaActual.getDate().toString().padStart(2, '0');
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const anio = fechaActual.getFullYear().toString();
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    id_client: customer[0]?.id,
    num_Fact: "",
    isWhite: false,
    status: "pendiente",
    fecha_entrega: `${anio}-${mes}-${dia}`,
    total_fact: "",
    saldo: 0,
    detalle_adt: "",
    id_sellers: seller[0]?.id
  });

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name);
    if (name === "total_fact") {
      console.log(name + " " + value);
      setFormData(prevState => ({
        ...prevState,
        [name]: parseFloat(value)
      }));
    }

    if (name === "num_Fact") {
      if (value.length > 17) {
        const message = "no puede ingresar mas de 17 digitos"
        setError(<p style={{
          fontSize: "14px", position: "absolute", padding: "5px", border: "2px solid red", borderRadius: "5px", backgroundColor: "#fff",
        }}>Error {message}</p>)
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
      if (value.length > 17) {
        const message = "no puede ingresar mas de 17 digitos"
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
    delete formData.id
    formData.saldo = formData.total_fact;
    createInvo(formData);
    console.log(formData);
    setEditingIndex(null)
    setFormData({
      id: "",
      id_client: customer[0]?.id,
      num_Fact: "",
      isWhite: false,
      status: "pendiente",
      fecha_entrega: currentdate,
      total_fact: "",
      saldo: 0,
      detalle_adt: "",
      id_sellers: seller[0]?.id
    });
  };

  const handleupdate = () => {
    // const updateData = ([...prevState, editData])
    // setData(prevState => [...prevState, editData]);
    console.log(editData);
    setEditingIndex(null)
  };

  const handleDelete = (id) => {
    delInvo(id);
  };

  const handleEdit = (index, item) => {
    console.log(item);
    if (item) {
      setEditingIndex(index)
      setEditMode(true);
      setEditData(item);
    }
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>CLient</th>
            <th># Factura</th>
            <th>IsWhite</th>
            <th>Status</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Saldo</th>
            <th>Details</th>
            <th>Seller</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>



          <tr >
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
              <select name="id_client"
                className="form-select h-25"
                style={{ padding: "3px", paddingRight: "40px" }}
                value={(formData.id_client)}
                onChange={handleChange}  >
                <option >Select Client</option>
                {
                  customer?.map((cust, index) => (
                    <option key={index} value={(parseInt(cust?.id))}>{cust?.id} - {cust?.nombre}</option>
                  ))
                }
              </select>
            </td>

            <td>
              <input
                placeholder="001-001-000000001"
                className="form-control form-control-sm"
                type="text"
                name="num_Fact"
                value={formData.num_Fact}
                onChange={handleChange}
              />
              {error}
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
                {editMode ? ("Save") : ("Add")}
                <i className={`fa-solid ${editMode ? "fa-floppy-disk" : "fa-circle-plus"}  bx-fw`}></i>
              </button>
            </td>
          </tr>

          {invoice?.map((item, index) => (
            <tr key={index}>
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
              {editingIndex === index ?
                <td>
                  <select name="id_client"
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

                  </select>
                </td>
                : <td>{item?.id_client_bill.nombre}</td>}

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
                : <td>{item?.fecha_entrega}</td>}

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
                : <td>{item?.total_fact}</td>}

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
                : <td>{item?.saldo}</td>}

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
                : <td>{item?.detalle_adt}</td>}

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
                : <td>{item?.id_seller_client.nombre}</td>}

              {/*Botones*/}
              <td>
                {editingIndex !== index ?
                  (<div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      className="btn btn-primary m-1 p-1 d-flex flex-row"
                      onClick={() => handleEdit(index, item)}>
                      <i className="fa-solid fa-pen-to-square bx-fw"></i>
                      Edit
                    </button>
                    <button
                      className="btn btn-danger m-1 p-1 d-flex flex-row"
                      style={{ alignItems: 'center' }}
                      onClick={() => handleDelete(item?.id)}>
                      <i className="fa-solid fa-trash-can bx-fw"></i>
                      Delete
                    </button>
                  </div>)
                  : <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      className="btn btn-success m-1 p-1 d-flex flex-row"
                      onClick={handleupdate}>
                      <i className="fa-solid fa-floppy-disk bx-fw"></i>
                      {"Save"}
                    </button>
                    <button type="button" className="btn btn-warning m-1 p-1 d-flex flex-row" style={{ alignItems: 'center' }} onClick={() => setEditingIndex(null)}>
                      <i className="fa-solid fa-xmark bx-fw"></i>
                    </button>
                  </div>}
              </td>
            </tr>
          ))}



        </tbody>
      </Table>
      {/* <Successful show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)} /> */}
      <Successful />
    </div >
  );
};

export default Tabledinamik;