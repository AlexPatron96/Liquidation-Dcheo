import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../../components/TableList';
import LoadingScreen from '../../layout/LoadingScreen';
import Paginationdesign from '../../components/Paginationdesign'
import { getRoutethunk } from '../../store/slices/dataTemp.slice';
import Functionalitiesbtn from '../../components/atom/Functionalitiesbtn';
import { getSellerThunk, updateSellerThunk } from '../../store/slices/seller.slice';
import Createdseller from '../../components/molecules/Createdseller';


const Sellers = () => {
    const sellerRedux = useSelector(state => state.seller);

    const dispatch = useDispatch();
    const loading = useSelector(state => state.isLoading);
    const pagination = useSelector(state => state.pagination);
    const listShow = ["#id", "Nombre", "Activo", "Ruta"];
    const listDB = ["nombre", "isActive", "id_route"];

    useEffect(() => {
        // dispatch(getRoutethunk());
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
    // const createdRoute = () => {
    //     alert("crear un nueva Ruta")
    //     if (!modalShow) {
    //         setModalShowRoute(true)
    //         console.log("mostrar model created Routed");
    //     } else {
    //         setModalShowRoute(false)
    //     }
    // }

    const btnCreated = () => {
        return (
            <>
                <button type="button" className="btn btn-success" onClick={createdSeller}>
                    <i className="fa-solid fa-circle-plus bx-fw"></i>{" "}
                    Create Seller
                    {/* <i className="fa-solid fa-truck bx-fw"></i> */}
                </button>
                {" "}
                {/* <button type="button" className="btn btn-success" onClick={createdSeller}>
                    Create Route
                </button> */}
            </>
        )
    }


    return (
        <div className='sellers pages'>
            <Createdseller show={modalShow} onHide={() => setModalShow(false)} listshow={listShow} listdb={listDB} title={"Created Seller"} />
            <div>
                <h2>
                    Sellers Available
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
                    data={'seller'}
                />
                    : <LoadingScreen />
                }
            </div>
        </div>
    );
};

export default Sellers;
