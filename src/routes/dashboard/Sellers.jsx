import React, { useEffect, useState } from 'react';
import { getRoutethunk } from '../../store/slices/dataTemp.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerThunk, updateSellerThunk } from '../../store/slices/seller.slice';
import Buttonatom from '../../components/atom/Buttonatom';
import TableList from '../../components/TableList';
import LoadingScreen from '../../layout/LoadingScreen';
import Paginationdesign from '../../components/Paginationdesign'
import Functionalitiesbtn from '../../components/atom/Functionalitiesbtn';
import Createdseller from '../../components/molecules/Createdseller';
import Formselectatom from '../../components/atom/Formselectatom';
import verify from "../../img/verificado.gif";


const Sellers = () => {

    const sellerRedux = useSelector(state => state.seller);
    const route = useSelector(state => state.temporary);
    const loading = useSelector(state => state.isLoading);
    const pagination = useSelector(state => state.pagination);

    const listShow = ["#id", "Nombre", "Activo", "Ruta"];
    const listDB = ["nombre", "isActive", "id_route"];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoutethunk());
        dispatch(getSellerThunk());
    }, [])

    const [modalShow, setModalShow] = useState(false);
    // const [modalShowRoute, setModalShowRoute] = useState(false);

    const updateData = (id, data) => {
        alert("Se Actualizo el Vendedor")
        dispatch(updateSellerThunk(id, data))
    }
    const deleteData = (id, data) => {
        alert("Se esta eliminando un Vendedor")
        // dispatch(deleteVehThunk(id, data));
    }
    const createdSeller = () => {
        alert("crear un nuevo VeNdedor")
        if (!modalShow) {
            setModalShow(true)
            console.log("mostrar model Vendedor");
        } else {
            setModalShow(false)
        }
    }

    const btnCreated = () => {
        return (
            <>
                <Buttonatom created={createdSeller}
                    title={"Create Seller"}
                    color={"success"} ico={"fa-circle-plus"} />
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

    const search = (data) => {
        alert(data)
    }
    return (
        <div className='sellers pages'>
            <Createdseller show={modalShow} onHide={() => setModalShow(false)} listshow={listShow} listdb={listDB} title={"Created Seller"} />
            <div>
                <h2>
                    Sellers Available
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
                />
                {!loading ? <Paginationdesign
                    data={'seller'}
                />
                    : <LoadingScreen />
                }
            </div>
            <Createdseller show={modalShow}
                onHide={() => setModalShow(false)}
                listshow={listShow} listdb={listDB}
                title={"Created Seller"}
                verify={verify} />
        </div>
    );
};

export default Sellers;
