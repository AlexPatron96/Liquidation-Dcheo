import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVehThunk, getVehiclesThunk, updateVehThunk } from '../../store/slices/vehicles.slice';
import { getRoutethunk } from '../../store/slices/dataTemp.slice';
import TableList from '../../components/TableList';
import LoadingScreen from '../../layout/LoadingScreen';
import Paginationdesign from '../../components/Paginationdesign'
import Formselectatom from '../../components/atom/Formselectatom';
import Createveh from '../../components/molecules/Createveh';
import Createdroute from '../../components/atom/Createdroute';
import Functionalitiesbtn from '../../components/atom/Functionalitiesbtn';
import Buttonatom from '../../components/atom/Buttonatom';
import verify from "../../img/verificado.gif";

const Vehicles = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVehiclesThunk());
        dispatch(getRoutethunk());
    }, [])

    const vehiclesRedux = useSelector(state => state.vehicles);
    const route = useSelector(state => state.temporary);
    const loading = useSelector(state => state.isLoading);
    const pagination = useSelector(state => state.pagination);


    const [modalShow, setModalShow] = useState(false);
    const [modalShowRoute, setModalShowRoute] = useState(false);
    
    const listShow = ["id", "Placa", "Conductor", "Dni", "Activo", "Ruta"];
    const listDB = ["placa", "chofer", "dni", "isActive", "id_route"];
    const listShowRoute = ["id", "Dia", "Detalle"];
    const listDbRoute = ["dia", "detail"];

    const updateData = (id, data) => {
        dispatch(updateVehThunk(id, data));
    }
    const deleteData = (id, data) => {
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

    const search = (data) => {
        alert(data);
    }
    
    const btnCreated = () => {
        return (
            <>
                <Buttonatom created={createdVeh}
                    title={"Create Vehicle"}
                    color={"success"} ico={"fa-circle-plus"} />
                <Buttonatom created={createdRoute}
                    title={"Create Route"}
                    color={"success"} ico={"fa-route"} />
            </>
        )
    }

    const listAvailable = () => {
        return (
            <>
                <Formselectatom title={"Routes Available"}
                    iterador={route}
                    firstdata={"dia"}
                    secunddata={" "}
                    disabledAction={true} />
            </>
        )
    }

    return (
        <div className='vehicles pages'>
            <div>
                <h2>
                    Vehicles Available
                </h2>
                <Functionalitiesbtn buttons={btnCreated}
                    listAvailable={listAvailable}
                    search={search} />
            </div>
            <div>
                <TableList
                    header={listShow}
                    data={pagination}
                    updateData={updateData}
                    deleteData={deleteData}
                />
                {!loading ? <Paginationdesign
                    data={"vehicles"}
                />
                    : <LoadingScreen />
                }
            </div>

            <Createdroute listshow={listShowRoute}
                listdb={listDbRoute}
                show={modalShowRoute}
                onHide={() => setModalShowRoute(false)}
                verify={verify} />

            <Createveh show={modalShow}
                onHide={() => setModalShow(false)}
                listshow={listShow} listdb={listDB}
                title={"Created Vehicle"}
                verify={verify} />
        </div>
    );
};

export default Vehicles;
{/* <input type="text" value={"0"}/> */ }
// const prop = ["#id", "Nombre", "Activo", "Ruta"];
// const prop = ["#id", "Factura", "Fact Blanca", "Estatus", "Fecha Entrega", "Total Factura", "Saldo", "Detalles Ad", "Cliente", "Tansaccion", "Vendedor"];
// const prop = {id, Condunctor, DNI , Placa , Ruta};
// const url = "/api/v1/vehicles/all";
// const method = "GET";
// const data = null;
// const dispatch = useDispatch();