import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Buttonatom from '../../components/atom/Buttonatom';
import Functionalitiesbtn from '../../components/atom/Functionalitiesbtn';
import Createdcustomer from '../../components/molecules/Createdcustomer';
import Tabledinamik from '../../components/molecules/Tabledinamik';
import Paginationdesign from '../../components/Paginationdesign';
import LoadingScreen from '../../layout/LoadingScreen';
import { getCustomerThunk } from '../../store/slices/customer.slice';
import { getRoutethunk } from '../../store/slices/dataTemp.slice';
import { deleteInvoiceThunk, getInvoiceThunk, postInvoicethunk, updateInvoiceThunk } from '../../store/slices/invoice.slice';
import { setPagination } from '../../store/slices/pagination.slice';
import { getSellerThunk } from '../../store/slices/seller.slice';
import { getVehiclesThunk } from '../../store/slices/vehicles.slice';

const Invoice = () => {
    const dispatch = useDispatch();

    const invoice = useSelector(state => state.invoice);
    const loading = useSelector(state => state.isLoading);
    const pagination = useSelector(state => state.pagination);
    const seller = useSelector(state => state.seller);
    const customer = useSelector(state => state.customer);
    const [refresh, setRefresh] = useState(false)
    const [liquidation, setliquidation] = useState(false)

    useEffect(() => {
        setRefresh(false)
        dispatch(getInvoiceThunk());
        dispatch(getCustomerThunk());
        dispatch(getSellerThunk());
        dispatch(getVehiclesThunk());
        dispatch(getRoutethunk());
    }, [refresh])

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
                <Buttonatom created={(() => setRefresh(true))}
                    title={"Actualizar"}
                    color={"info"} ico={"fa-sync fa-spin"} />
            </>
        )
    }
    /************************************************************************************** */

    const createInvo = (data) => {
        alert('Creando factura')
        console.log(data);
        dispatch(postInvoicethunk(data));
        setRefresh(true)
    }
    const updateInvo = (data) => {
        alert('actualizando factura')
        console.log(data);
        const { id } = data;
        const urlId = id;
        data.id_sellers ? data.id_sellers : data.id_sellers = data.id_seller_client.id;
        delete data.id;
        delete data.id_seller_client;
        delete data.id_client_bill;
        delete data.id_transactions;
        console.log(data);
        console.log(id);
        dispatch(updateInvoiceThunk(id, data));
        setRefresh(true)
    }
    const delInvo = (id) => {
        dispatch(deleteInvoiceThunk(id));
        setRefresh(true)
    }
    const search = (data) => {
        // alert(data)
        const filteredList = invoice.filter((item) =>
        (
            (item.id_client_bill.nombre).toLowerCase().includes(data.toLowerCase()) ||
            (item.id_client_bill.dni).includes(data) ||
            (item.num_Fact).includes(data) ||
            (item.fecha_entrega).includes(data)
        ));
        dispatch(setPagination(filteredList));
        console.log(filteredList);
    }
    return (
        <div className='pages'>
            <h2>Facturas</h2>
            <Functionalitiesbtn
                buttons={btnCreated}
                // listAvailable={listAvailable}
                search={search} />

            <Tabledinamik invoice={pagination} seller={seller}
                customer={customer} createInvo={createInvo}
                updateInvo={updateInvo} delInvo={delInvo}
                refresh={refresh} liquidationAct={liquidation} />

            {!loading ? <Paginationdesign
                data={"invoice"}
            />
                : <LoadingScreen />
            }
            <Createdcustomer
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={"Created Customer"}
            />
        </div>
    );
};

export default Invoice;