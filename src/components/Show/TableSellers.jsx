import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getRoutethunk } from '../../store/slices/dataTemp.slice';
import Swal from "sweetalert2";

const TableSellers = ({ data, updateData, deleteData }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        route[0] ? null : dispatch(getRoutethunk());
    }, [])

    const route = useSelector(state => state.temporary);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editedData, setEditedData] = useState([]);


    const handleEdit = (index, obj) => {
        setEditingIndex(index);
        setEditedData(obj);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedData({ ...editedData, [name]: value });
    };


    const handleSave = (id) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: `Estas editando un Vendedor ${editedData.name}, deseas guardar los cambios.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#029C63',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo guardar!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Guardado!',
                    `Se ah actualizado el Vendedor ${editedData.name}.`,
                    'success'
                )
                updateData(id, editedData);
                setEditingIndex(null);
                setEditedData({});
            }
        })
    };


    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: `Estas eliminando el item ${editedData.name}, deseas eliminarlo.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#029C63',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    `Se ah eliminado con exito.  ${editedData.name}.`,
                    'success'
                )
                deleteData(id);
                setEditingIndex(null);
                setEditedData({});
            }
        })
    }


    return (
        <div className='tables-view'>
            <Table striped bordered hover responsive style={{ width: "980px" }}>
                <thead >
                    <tr>
                        <th style={{ width: "40px" }}>Id</th>
                        <th style={{ width: "75px" }}>Codigo MV</th>
                        <th style={{ width: "200px" }}>Nombre</th>
                        <th style={{ width: "100px" }}>Activo</th>
                        <th style={{ width: "130px" }}>Ruta</th>
                        <th style={{ width: "100px" }}>Balance</th>
                        <th style={{ width: "40px" }}>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} style={{ height: "50px" }}>

                            {/* <td style={{ width: "15px" }}>{index + 1}</td> */}

                            {editingIndex === index ?
                                (<td style={{ textAlign: "center" }}>
                                    <input
                                        style={{ width: "40px" }}
                                        className="form-control form-control-sm"
                                        name='id'
                                        disabled
                                        onChange={handleInputChange}
                                        value={editedData.id}
                                    />
                                </td>)
                                :
                                (<td style={{ textAlign: "center" }}>
                                    {item.id}
                                </td>)
                            }

                            {editingIndex === index ?
                                (<td>
                                    <input
                                        style={{ width: "85px" }}
                                        className="form-control form-control-sm"
                                        name='code'
                                        onChange={handleInputChange}
                                        value={editedData.code}
                                    />
                                </td>)
                                :
                                (<td>
                                    {item.code}
                                </td>)
                            }

                            {editingIndex === index ?
                                (<td>
                                    <input
                                        style={{ width: "300px" }}
                                        className="form-control form-control-sm"
                                        name='name'
                                        onChange={handleInputChange}
                                        value={editedData.name}
                                    />
                                </td>)
                                :
                                (<td>
                                    {item.name}
                                </td>)
                            }

                            {editingIndex === index ?
                                (<td>
                                    <select name="isActive"
                                        className="form-select h-25"
                                        style={{ padding: "3px", paddingRight: "40px", width: "120px" }}
                                        value={editedData.isActive}
                                        onChange={handleInputChange}       >
                                        <option value={true}>Estatus</option>
                                        <option value={true}>Si</option>
                                        <option value={false}>No</option>
                                    </select>

                                </td>)
                                :
                                (<td>
                                    {item.isActive === true ? "Si" : "No"}
                                </td>)
                            }

                            {editingIndex === index ?
                                (<td>
                                    <select name="id_route"
                                        className="form-select h-25"
                                        style={{ padding: "3px", paddingRight: "40px", width: "170px" }}
                                        value={editedData.id_route}
                                        onChange={handleInputChange}       >
                                        <option >Seleccione Ruta</option>
                                        {
                                            route.map((rout, index) => (
                                                <option key={index} value={rout?.id}> {rout.name} - {rout?.external_code} </option>
                                            ))
                                        }
                                    </select>

                                </td>)
                                :
                                (<td>
                                    {item.route?.name} - {item.route?.external_code}
                                </td>)
                            }

                            <td>
                                {item.balance_sell?.total}
                            </td>

                            <td className='tdBtn' style={{ maxWidth: "145px" }}>
                                {editingIndex === index ? (
                                    <>
                                        <button type="button" className="btn btn-success btn-actions" onClick={() => handleSave(item.id)}>
                                            <i className="fa-solid fa-floppy-disk bx-fw"></i>
                                        </button>

                                        <button type="button" className="btn btn-warning btn-actions" style={{ alignItems: 'center' }} onClick={() => setEditingIndex(null)}>
                                            <i className="fa-solid fa-xmark bx-fw"></i>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" className="btn btn-primary  btn-actions" onClick={() => handleEdit(index, item)}>
                                            <i className="fa-solid fa-pen-to-square bx-fw"></i>
                                        </button>
                                        <button type="button" className="btn btn-danger btn-actions" style={{ alignItems: 'center' }} onClick={() => handleDelete(item.id)}>
                                            <i className="fa-solid fa-trash-can bx-fw"></i>
                                        </button>

                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TableSellers;