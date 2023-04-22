import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoutethunk } from '../../store/slices/dataTemp.slice';
import { deleteCustomerThunk, getCustomerThunk, updateCustomerThunk } from '../../store/slices/customer.slice';
import TableList from '../../components/TableList';
import LoadingScreen from '../../layout/LoadingScreen';
import Paginationdesign from '../../components/Paginationdesign'
import Functionalitiesbtn from '../../components/atom/Functionalitiesbtn';
import Createdcustomer from '../../components/creators/Createdcustomer';
import Buttonatom from '../../components/atom/Buttonatom';
import Formselectatom from '../../components/atom/Formselectatom';
import { getVehiclesThunk } from '../../store/slices/vehicles.slice';
import { getSellerThunk } from '../../store/slices/seller.slice';
import { setPagination } from '../../store/slices/pagination.slice';
import TableCustomer from '../../components/Show/TableCustomer';
import CreateCustomerClouster from '../../components/creators/CreateCustomerClouster';
import Swal from 'sweetalert2';
import { setErrorReceived } from '../../store/slices/errorReceived.slice';


const Customers = () => {

    const dispatch = useDispatch();
    // /************ VERIFICA SI NO HAY UN ERROR EN EL SLICE DE ERROR ****************/
    // const errorReceived = useSelector(state => state.errorReceived);
    // errorReceived.length === 0 ? null : Swal.fire({
    //     title: "Error",
    //     text: `Existe un error en esta operacion : ${errorReceived.error} `,
    //     icon: 'error',
    //     confirmButtonColor: '#d33',
    //     confirmButtonText: 'OK'
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         dispatch(setErrorReceived([]))
    //     }
    // });
    // /**************************************************************/
    useEffect(() => {
        customer[0] ? null : dispatch(getCustomerThunk());
    }, [])

    const customer = useSelector(state => state.customer);
    const loading = useSelector(state => state.isLoading);
    const pagination = useSelector(state => state.pagination);
    const seller = useSelector(state => state.seller);
    const vehicle = useSelector(state => state.vehicles);
    const route = useSelector(state => state.temporary);
    // const listShow = ["#id", "Nombre", "Direccion", "Dni", "Vehiculo", "Route", "Seller"];
    // const listDB = ["nombre", "direccion", "dni", "id_sellers", "id_vehicle", "id_route"];

    /***********************  MODAL PARA CREAR NUEVAS FACTURAS *************************/
    const [modalShow, setModalShow] = useState(false);

    const [showCreateByClouster, setShowCreateByClouster] = useState(false);
    console.log(pagination);;
    const createByClouster = () => {
        if (!showCreateByClouster) {
            setShowCreateByClouster(true)
            console.log("mostrar model created showCreateByClouster");
        } else {
            setShowCreateByClouster(false)
        }
    }

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
                <Buttonatom created={createByClouster}
                    title={""}
                    color={"success"} ico={"fa-cloud-arrow-up"} />
                <Buttonatom created={refresh}
                    title={""}
                    color={"info"} ico={"fa-arrow-rotate-right bx-spin-hover"} />
            </>
        )
    }
    /************************************************************************************** */
    const updateData = (id, data) => {
        // alert("Se Actualizo el Cliente")
        dispatch(updateCustomerThunk(id, data))
    }
    const deleteData = (id) => {
        // alert("Se esta eliminando un Cliente")
        dispatch(deleteCustomerThunk(id));
    }

    const refresh = () => {
        dispatch(getCustomerThunk());
    };


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
            (item.fullname).toLowerCase()?.includes(data.toLowerCase()) ||
            (item.dni)?.includes(data) || (item.route_day.dia)?.includes(data) ||
            (item.seller.name)?.toLowerCase().includes(data.toLowerCase()) || (item.address)?.toLowerCase().includes(data.toLowerCase()) ||
            (item.seller.code)?.toLowerCase().includes(data.toLowerCase())
        ));
        console.log(filteredList);
        dispatch(setPagination(filteredList));
    }


    return (
        <div className='customer pages'>
            <div>
                <h2>
                    Clientes
                </h2>
                <Functionalitiesbtn
                    buttons={btnCreated}
                    // listAvailable={listAvailable}
                    search={search} />
            </div>
            <div>
                <TableCustomer
                    data={pagination}
                    updateData={updateData}
                    deleteData={deleteData}
                />

                {!loading ? <Paginationdesign
                    data={"customer"}
                />
                    : <LoadingScreen />
                }
            </div>
            <CreateCustomerClouster
                show={showCreateByClouster}
                onHide={() => setShowCreateByClouster(false)} />
            <Createdcustomer
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default Customers;