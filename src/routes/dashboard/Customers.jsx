import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoutethunk } from '../../store/slices/dataTemp.slice';
import { deleteCustomerThunk, getCustomerThunk, updateCustomerThunk } from '../../store/slices/customer.slice';
import TableList from '../../components/TableList';
import LoadingScreen from '../../layout/LoadingScreen';
import Paginationdesign from '../../components/Paginationdesign'
import Functionalitiesbtn from '../../components/atom/Functionalitiesbtn';
import Createdcustomer from '../../components/molecules/Createdcustomer';
import Buttonatom from '../../components/atom/Buttonatom';
import Formselectatom from '../../components/atom/Formselectatom';
import { getVehiclesThunk } from '../../store/slices/vehicles.slice';
import { getSellerThunk } from '../../store/slices/seller.slice';
import { setPagination } from '../../store/slices/pagination.slice';


const Customers = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCustomerThunk());
        dispatch(getRoutethunk());
        dispatch(getVehiclesThunk());
        dispatch(getSellerThunk());
    }, [])

    const customer = useSelector(state => state.customer);
    const loading = useSelector(state => state.isLoading);
    const pagination = useSelector(state => state.pagination);
    const seller = useSelector(state => state.seller);
    const vehicle = useSelector(state => state.vehicles);
    const route = useSelector(state => state.temporary);
    const listShow = ["#id", "Nombre", "Direccion", "Dni", "Vehiculo", "Route", "Seller"];
    const listDB = ["nombre", "direccion", "dni", "id_sellers", "id_vehicle", "id_route"];

    /***********************  MODAL PARA CREAR NUEVAS FACTURAS *************************/
    const [modalShow, setModalShow] = useState(false);
    const createdCustomer = () => {
        if (!modalShow) {
            setModalShow(true)
        } else {
            setModalShow(false)
        }
    }
    const btnCreated = () => {
        return (
            <>
                <Buttonatom created={createdCustomer}
                    title={"Crear Cliente"}
                    color={"success"} ico={"fa-circle-plus"} />
            </>
        )
    }
    /************************************************************************************** */
    const updateData = (id, data) => {
        alert("Se Actualizo el Cliente")
        dispatch(updateCustomerThunk(id, data))
    }
    const deleteData = (id, data) => {
        alert("Se esta eliminando un Cliente")
        dispatch(deleteCustomerThunk(id, data));
    }



    const listAvailable = () => {
        return (
            <>
                <Formselectatom title={"Ver Vehiculos Disponibles"}
                    iterador={vehicle}
                    firstdata={"chofer"}
                    secunddata={"placa"}
                    disabledAction={true} />

                <Formselectatom title={"Ver Ruta Disponibles"}
                    iterador={route}
                    firstdata={"id"}
                    secunddata={"dia"}
                    disabledAction={true} />

                <Formselectatom title={"Ver Vendedores Disponibles"}
                    iterador={seller}
                    firstdata={"nombre"}
                    secunddata={" "}
                    disabledAction={true} />

            </>
        )
    }

    const search = (data) => {
        const filteredList = customer.filter((item) =>
        (
            (item.nombre).toLowerCase().includes(data.toLowerCase()) ||
            (item.dni).includes(data) || (item.route.dia).includes(data) ||
            (item.seller.nombre).includes(data)
        ));
        dispatch(setPagination(filteredList));
    }
    return (
        <div className='customer pages'>
            <div>
                <h2>
                    Clientes Disponibles
                </h2>
                <Functionalitiesbtn
                    buttons={btnCreated}
                    listAvailable={listAvailable}
                    search={search} />
            </div>
            <div>
                <TableList
                    header={listShow}
                    data={pagination}
                    updateData={updateData}
                    deleteData={deleteData}
                />{
                    console.log(customer)
                }
                {!loading ? <Paginationdesign
                    data={"customer"}
                />
                    : <LoadingScreen />
                }
            </div>
            <Createdcustomer
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={"Created Customer"}
            />
        </div>
    );
};

export default Customers;
            // const prop = ["#id", "Nombre", "Direccion", "Dni", "Seller", "Route", "Vehiculo"];
            // const url = "/api/v1/customer/all";
            // const method = "GET";
            // const data = null;