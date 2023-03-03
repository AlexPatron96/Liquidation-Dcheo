import React, { useState } from "react";
import Table from 'react-bootstrap/Table';

const Tabledinamik2 = () => {
    const [editedData, setEditedData] = useState([
        { id: 1, numfac: 123, status: "Pendiente", fecha: "2022-01-01", total: 100 },
        { id: 2, numfac: 456, status: "Abonada", fecha: "2022-02-01", total: 200 },
        { id: 3, numfac: 789, status: "Pagada", fecha: "2022-03-01", total: 300 }
    ]);
    const [formData, setFormData] = useState({
        id: "",
        numfac: "",
        status: "Pendiente",
        fecha: "",
        total: ""
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [editMode, setEditMode] = useState(false);

    // const [editedData, setEditedData] = useState([]);

    const handleEdit = (index, obj) => {
        setEditingIndex(index);
        setEditedData(obj);
        // setId(obj.id);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(editedData);
    };

    const handleSave = (index) => {
        console.log(editedData); // Salida de Datos de edicion de la tabla
        // updateData(id, editedData);
        // console.log(editedData);
        // setEditingIndex(null);
        // setEditedData({});
        setEditedData(prevState => [...prevState, formData]);
        setFormData({
            id: "",
            numfac: "",
            status: "Pendiente",
            fecha: "",
            total: ""
        });
    };

    const handleDelete = id => {
        setEditedData(prevState => prevState.filter(item => item.id !== id));
    };

    const handleAdd = () => {
        setData(prevState => [...prevState, formData]);
        setFormData({
            id: "",
            numfac: "",
            status: "Pendiente",
            fecha: "",
            total: ""
        });
    };
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NumFac</th>
                        <th>Status</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {editedData?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.numfac}</td>
                            <td>{item.status}</td>
                            <td>{item.fecha}</td>
                            <td>{item.total}</td>
                            <td>
                                <button type="button" className="btn btn-success mb-0 p-1 d-flex flex-row"
                                    onClick={() => handleEdit(index, item)}>
                                    <i className="fa-solid fa-floppy-disk bx-fw"></i>
                                    Edit
                                </button>
                                <button type="button" className="btn btn-danger m-1 p-1 d-flex flex-row"
                                    style={{ alignItems: 'center' }}
                                    onClick={() => handleDelete(item.id)}>
                                    <i className="fa-solid fa-trash-can bx-fw"></i>
                                    Delete
                                </button>
                                {/* <button onClick={() => handleEdit(index, item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button> */}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <input
                                className="form-control form-control-sm"
                                type="text"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                placeholder="001-001-000000001"
                                className="form-control form-control-sm"
                                type="text"
                                name="numfac"
                                value={formData.numfac}
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <select name="status"
                                className="form-select h-25"
                                style={{ padding: "3px", paddingRight: "40px" }}
                                value={formData.status}
                                onChange={handleChange}        >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Abonada">Abonada</option>
                                <option value="Pagada">Pagada</option>
                            </select>
                        </td>
                        <td>
                            <input
                                className="form-control form-control-sm"
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                            />
                        </td>
                        <td style={{ display: "flex", flexDirection: "row" }}>
                            <div className="input-group mb-3"  >
                                <span className="input-group-text" style={{ padding: "3px", paddingRight: "15px", paddingLeft: "15px" }}>$</span>
                                <input
                                    aria-label="Amount (to the nearest dollar)"
                                    className="form-control form-control-sm"
                                    style={{ padding: "3px", paddingRight: "40px" }}
                                    type="text"
                                    name="total"
                                    value={formData.total}
                                    onChange={handleChange}
                                />
                            </div>
                        </td>
                        <td>
                            <button type="button"
                                className="btn btn-primary mb-0 p-1 d-flex flex-row"
                                onClick={() => { handleAdd }}>
                                <i className="fa-solid fa-pen-to-square bx-fw"></i>
                                {editMode ? "Save" : "Add"}
                            </button>
                            {/* <button onClick={handleAdd}>{editMode ? "Save" : "Add"}</button> */}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
};

export default Tabledinamik2;