import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Buttonatom from '../../components/atom/Buttonatom';
import Functionalitiesbtn from '../../components/atom/Functionalitiesbtn';
import Createdcustomer from '../../components/creators/Createdcustomer';
import Tabledinamik from '../../components/molecules/Tabledinamik';
import Paginationdesign from '../../components/Paginationdesign';
import LoadingScreen from '../../layout/LoadingScreen';
import { deleteInvoiceThunk, getInvoiceThunk, postInvoiceTransacthunk, postInvoicethunk, updateInvoiceThunk } from '../../store/slices/invoice.slice';
import { setPagination } from '../../store/slices/pagination.slice';
import Swal from 'sweetalert2';
import TableInvoice from '../../components/Show/TableInvoice';
import { getRouteDayThunk } from '../../store/slices/routeday.slice';
import { setErrorReceived } from '../../store/slices/errorReceived.slice';
import ModalTransaccion from '../../components/Modals/ModalTransaccion';
import ModalInvoiceTransac from '../../components/Modals/ModalInvoiceTransac';
import { getSellerThunk } from '../../store/slices/seller.slice';
import { getCustomerThunk } from '../../store/slices/customer.slice';
import Formselectatom from '../../components/atom/Formselectatom';

const Invoice = () => {

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
        invoice[0] ? null : dispatch(getInvoiceThunk());
        routeDay[0] ? null : dispatch(getRouteDayThunk());
    }, [])

    const routeDay = useSelector(state => state.routeDay);
    const invoice = useSelector(state => state.invoice);
    const loading = useSelector(state => state.isLoading);
    const pagination = useSelector(state => state.pagination);

    // console.log(invoice);
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
                <Buttonatom created={transaccionPay}
                    title={"Pago o Abono"}
                    color={"success"} ico={"fa-sack-dollar"} />
                <Buttonatom created={refresh}
                    title={""}
                    color={"info"} ico={"fa-arrow-rotate-right bx-spin-hover"} />
            </>
        )
    }
    /************************************************************************************** */

    const createInvo = (data) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Se a creado una Factura nueva",
            showConfirmButton: false,
            timer: 1500
        })
        dispatch(postInvoiceTransacthunk(data));
    };

    const updateInvo = (id, data) => {
        dispatch(updateInvoiceThunk(id, data));
    };

    const delInvo = (id) => {
        dispatch(deleteInvoiceThunk(id));
    };

    const search = (data) => {

        const filteredList = invoice.filter((item) =>
        (
            (item?.client?.fullname).toLowerCase().includes((data).toLowerCase()) ||
            (item?.client?.dni).includes(data) ||
            (item?.num_bill).includes(data) ||
            (item?.deliver_date).includes(data) ||
            (item?.seller.code).toLowerCase().includes(data) ||
            (item?.seller.name).toLowerCase().includes(data)
        ));
        dispatch(setPagination(filteredList));
        // console.log(filteredList);
    };

    const [modalTransaccionPay, setModalTransaccionPay] = useState(false);
    const [itemSelect, setItemSelect] = useState("");

    const transaccionPay = (item) => {
        setModalTransaccionPay(true);
        setItemSelect(item);
    };

    const refresh = () => {
        dispatch(getInvoiceThunk());
        dispatch(getRouteDayThunk());
        dispatch(getSellerThunk());
        dispatch(getCustomerThunk());
    };

    const selecionSearch = (e) => {
        const { name, value } = e.target;
        console.log(value);
    };
    const searchDB = [
        { "id": 1, "detail": "LOCAL" },
        { "id": 2, "detail": "BASE DATOS" },
    ];
    const listAvailable = () => {
        return (
            <>
                <Formselectatom title={"Selecionar lugar de busqueda"}
                    iterador={searchDB}
                    dataSelect={selecionSearch}
                    firstdata={"detail"}
                    secunddata={"dia"}
                    disabledAction={false} />
            </>
        )
    };
    return (
        <div className='pages'>
            <h2>Facturas</h2>
            <Functionalitiesbtn
                buttons={btnCreated}
                listAvailable={listAvailable}
                search={search} />

            <TableInvoice
                data={pagination}
                updateInvo={updateInvo}
                delInvo={delInvo}
                transaccionPay={transaccionPay}
                createInvo={createInvo} />

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
            {/* <ModalInvoiceTransac onHide={() => { setModalTransaccionPay(false) }} show={modalTransaccionPay} /> */}
            <ModalInvoiceTransac itemSelect={itemSelect} onhide={() => setModalTransaccionPay(false)} show={modalTransaccionPay} />
        </div>
    );
};

export default Invoice;