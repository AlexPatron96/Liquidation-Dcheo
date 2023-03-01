import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../components/TableList';
import LoadingScreen from '../../layout/LoadingScreen';
import Paginationdesign from '../../components/Paginationdesign'
// import { getRoutethunk } from '../../store/slices/dataTemp.slice';
import Functionalitiesbtn from '../../components/atom/Functionalitiesbtn';
import { deleteCustomerThunk, getCustomerThunk, postCustomerthunk, updateCustomerThunk } from '../../store/slices/customer.slice';
import Createdcustomer from '../../components/molecules/Createdcustomer';


const Customers = () => {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.isLoading);
    const pagination = useSelector(state => state.pagination);
    const listShow = ["#id", "Nombre", "Direccion", "Dni", "Vehiculo", "Route", "Seller"];
    const listDB = ["nombre", "direccion", "dni", "id_sellers", "id_vehicle", "id_route"];

    useEffect(() => {
        dispatch(getCustomerThunk());
    }, [])

    const [modalShow, setModalShow] = useState(false);

    const updateData = (id, data) => {
        alert("Se Actualizo el Cliente")
        dispatch(updateCustomerThunk(id, data))
    }
    const deleteData = (id, data) => {
        alert("Se esta eliminando un Cliente")
        dispatch(deleteCustomerThunk(id, data));
    }

    const createdCustomer = () => {
        if (!modalShow) {
            setModalShow(true)
            console.log("mostrar model CLiente");
        } else {
            setModalShow(false)
        }
    }

    const btnCreated = () => {
        return (
            <>
                <button type="button" className="btn btn-success" onClick={createdCustomer}>
                    <i className="fa-solid fa-circle-plus bx-fw"></i>{" "}
                    Create Vehicle
                </button>
                {" "}
                <button type="button" className="btn btn-success" onClick={createdCustomer}>
                    Create Route
                    {/* <i className="fa-solid fa-truck bx-fw"></i> */}
                </button>
            </>
        )
    }


    return (
        <div className='customer pages'>
            <div>
                <h2>
                    Customer Available
                </h2>
                <Functionalitiesbtn buttons={btnCreated} />
            </div>
            <div>
                <TableList
                    header={listShow}
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
            <Createdcustomer
                show={modalShow}
                onHide={() => setModalShow(false)}
                listshow={listShow} listdb={listDB}
                title={"Created Seller"}
            />
        </div>
    );
};

export default Customers;
            // const prop = ["#id", "Nombre", "Direccion", "Dni", "Seller", "Route", "Vehiculo"];
            // const url = "/api/v1/customer/all";
            // const method = "GET";
            // const data = null;