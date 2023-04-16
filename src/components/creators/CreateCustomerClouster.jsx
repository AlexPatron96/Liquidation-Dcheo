import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { postCustomerClousterthunk } from '../../store/slices/customer.slice';


const CreateCustomerClouster = (props) => {

    const dispatch = useDispatch();

    const [customer, setCustomer] = useState([]);

    const CargaArchivo = (evento) => {
        const archivo = evento.target.files[0];
        const lector = new FileReader();
        lector.onload = (evento) => {
            const datos = evento.target.result;
            const libro = XLSX.read(datos, { type: 'binary' });
            const hoja = libro.Sheets['Hoja1'];
            const datosJson = XLSX.utils.sheet_to_json(hoja, { header: 1 });
            const customerJson = datosJson.slice(1).map((fila) => ({
                fullname: fila[0],
                code_external: fila[1],
                address: fila[2],
                dni: fila[3],
                id_seller: fila[4],
                id_route_day: fila[5],
            }));
            console.log(libro);

            setCustomer(customerJson);
        };
        lector.readAsBinaryString(archivo);
    };

    const loaderCustomerClouster = () => {
        dispatch(postCustomerClousterthunk(customer));
        setCustomer([]);
    }

    return (
        <div>
            <div>
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Carga externa de Clientes
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                            <div>
                                Podra cargar documentos de formatos (.xlsx ) con la siguiente estructura.
                                <a href="/src/document/exel/seller.xlsx" download={"formado-pdf-Seller.xlsx"}>Descargar</a>
                            </div>

                            <div style={{ margin: "2rem 0" }}>
                                <input type="file" onChange={CargaArchivo} />
                            </div>

                            <Table striped bordered hover style={{ maxWidth: "700px", height: "10px", overflow: "auto" }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Cod MV</th>
                                        <th>Direccion</th>
                                        <th>identificacion</th>
                                        <th>Vendedor</th>
                                        <th>Dia atencion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customer.map((customer, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {customer.fullname}
                                                </td>
                                                <td>
                                                    {customer.code_external}
                                                </td>
                                                <td>
                                                    {customer.address}
                                                </td>
                                                <td>
                                                    {customer.dni}
                                                </td>
                                                <td>
                                                    {customer.id_seller}
                                                </td>
                                                <td>
                                                    {customer.id_route_day}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit" onClick={() => loaderCustomerClouster()} >
                            Cargar
                        </Button>
                        <Button onClick={props.onHide}>Cerrar</Button>
                    </Modal.Footer>
                </Modal >
            </div>
        </div>
    );
};

export default CreateCustomerClouster;