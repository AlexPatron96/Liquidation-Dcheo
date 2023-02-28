import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import TableList from '../../components/TableList';
import LoadingScreen from '../../layout/LoadingScreen';
import Paginationdesign from '../../components/Paginationdesign'
// import Createveh from '../../components/molecules/Createveh';
// import Modalfuction from '../../components/atom/Modalfuction';
import Functionalitiesbtn from '../../components/atom/Functionalitiesbtn';
import { getRoutethunk } from '../../store/slices/dataTemp.slice';
import { deleteVehThunk, getVehiclesThunk, updateVehThunk } from '../../store/slices/vehicles.slice';

const Vehicles = () => {
    const vehiclesRedux = useSelector(state => state.vehicles);
    useEffect(() => {
        dispatch(getVehiclesThunk());
        dispatch(getRoutethunk());
    }, [])

    const dispatch = useDispatch();
    const loading = useSelector(state => state.isLoading);
    const pagination = useSelector(state => state.pagination);

    console.log(pagination);
    console.log(vehiclesRedux);



    const listShow = ["id", "Placa", "Conductor", "Dni", "Activo", "Ruta"];
    const listDB = ["placa", "chofer", "dni", "isActive", "id_route"];
    const listShowRoute = ["id", "Dia", "Detalle"];
    const listDbRoute = ["dia", "detail"];


    const [modalShow, setModalShow] = useState(false);
    const [modalShowRoute, setModalShowRoute] = useState(false);
    
    const  updateData = (id , data) => {
        alert("Se Actualizo el vehiculo")    
        dispatch(updateVehThunk(id, data));
    }
    const  deleteData = (id , data) => {
        alert("Se esta eliminando un vehiculo")    
        dispatch(deleteVehThunk(id, data));
    }
    
    const createdVeh = () => {
        alert("crear un nuevo Veh")
        if (!modalShow) {
            setModalShow(true)
            console.log("mostrar model veh");
        } else {
            setModalShow(false)
        }
    }
    const createdRoute = () => {
        alert("crear un nueva Ruta")
        if (!modalShow) {
            setModalShowRoute(true)
            console.log("mostrar model created Routed");
        } else {
            setModalShowRoute(false)
        }
    }

    const btnCreated = () => {
        return (
            <>
                <button type="button" className="btn btn-success" onClick={createdVeh}>
                    Create Vehicle
                    {/* <i className="fa-solid fa-truck bx-fw"></i> */}
                </button>
                {" "}
                <button type="button" className="btn btn-success" onClick={createdRoute}>
                    Create Route
                </button>
            </>
        )
    }
    
    return (
        <div className='vehicles pages'>
            <div>
                <h2>
                    Vehicles Available
                </h2>
                <Functionalitiesbtn buttons={btnCreated} />
            </div>
            <div>
                {/* <TableList
                    header={listShow}
                    data={pagination}
                    updateData={updateData}
                    deleteData={deleteData}
                /> */}
                {!loading ? <Paginationdesign
                    data={"vehicles"}
                />
                    : <LoadingScreen />
                }
            </div>
            {/* <input type="text" value={"0"}/> */}
            {/* <Modalfuction listshow={listShowRoute} listdb={listDbRoute} show={modalShowRoute} onHide={() => setModalShowRoute(false)} />
            <Createveh show={modalShow} onHide={() => setModalShow(false)} listshow={listShow} listdb={listDB} title={"Created Vehicle"} /> */}
        </div>
    );
};

export default Vehicles;
// const prop = ["#id", "Nombre", "Activo", "Ruta"];
// const prop = ["#id", "Factura", "Fact Blanca", "Estatus", "Fecha Entrega", "Total Factura", "Saldo", "Detalles Ad", "Cliente", "Tansaccion", "Vendedor"];
// const prop = {id, Condunctor, DNI , Placa , Ruta};
// const url = "/api/v1/vehicles/all";
// const method = "GET";
// const data = null;
// const dispatch = useDispatch();