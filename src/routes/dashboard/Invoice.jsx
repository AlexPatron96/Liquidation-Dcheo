import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Functionalitiesbtn from '../../components/atom/Functionalitiesbtn';
import Tabledinamik from '../../components/molecules/Tabledinamik';
import { getCustomerThunk } from '../../store/slices/customer.slice';
import { deleteInvoiceThunk, getInvoiceThunk, postInvoicethunk, updateInvoiceThunk } from '../../store/slices/invoice.slice';
import { getSellerThunk } from '../../store/slices/seller.slice';

const Invoice = () => {
    const dispatch = useDispatch();

    const invoice = useSelector(state => state.invoice);
    const seller = useSelector(state => state.seller);
    const customer = useSelector(state => state.customer);
    const [refresh, setRefresh] = useState(false)
    const [liquidation, setliquidation] = useState(false)

    useEffect(() => {
        setRefresh(false)
        dispatch(getInvoiceThunk());
        dispatch(getCustomerThunk());
        dispatch(getSellerThunk());
    }, [refresh])

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

    return (
        <div className='pages'>
            <h2>Facturas</h2>
            <button onClick={() => setRefresh(true)} >Refresh</button>
            <Functionalitiesbtn />
            <Tabledinamik invoice={invoice} seller={seller}
                customer={customer} createInvo={createInvo}
                updateInvo={updateInvo} delInvo={delInvo}
                refresh={refresh} liquidationAct={liquidation} />
        </div>
    );
};

export default Invoice;