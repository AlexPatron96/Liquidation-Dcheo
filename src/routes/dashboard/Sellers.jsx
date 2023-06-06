import React, { useEffect, useState } from "react";
import { getRoutethunk } from "../../store/slices/dataTemp.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSellerThunk,
  getSellerThunk,
  updateSellerThunk,
} from "../../store/slices/seller.slice";
import Buttonatom from "../../components/atom/Buttonatom";
import TableList from "../../components/TableList";
import LoadingScreen from "../../layout/LoadingScreen";
import Paginationdesign from "../../components/Paginationdesign";
import Functionalitiesbtn from "../../components/atom/Functionalitiesbtn";
import Createdseller from "../../components/molecules/Createdseller";
import Formselectatom from "../../components/atom/Formselectatom";
import verify from "../../img/verificado.gif";
import { setPagination } from "../../store/slices/pagination.slice";
import CreateSellersClouster from "../../components/creators/CreateSellersClouster";
import CreateSeller from "../../components/creators/CreateSeller";
import TableSellers from "../../components/Show/TableSellers";
import { setErrorReceived } from "../../store/slices/errorReceived.slice";
import Swal from "sweetalert2";

const Sellers = () => {
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
    sellerRedux[0] ? null : dispatch(getSellerThunk());
  }, []);

  const sellerRedux = useSelector((state) => state.seller);
  // const route = useSelector(state => state.temporary);
  const loading = useSelector((state) => state.isLoading);
  const pagination = useSelector((state) => state.pagination);

  const listShow = ["#id", "Nombre", "Activo", "Ruta"];
  const listDB = ["nombre", "isActive", "id_route"];

  console.log(sellerRedux);

  const [modalShow, setModalShow] = useState(false);

  const updateData = (id, data) => {
    dispatch(updateSellerThunk(id, data));
  };
  const deleteData = (id) => {
    // console.log(id);
    dispatch(deleteSellerThunk(id));
  };

  const createdSeller = () => {
    if (!modalShow) {
      setModalShow(true);
      // console.log("mostrar model Vendedor");
    } else {
      setModalShow(false);
    }
  };
  const [showCreateByClouster, setShowCreateByClouster] = useState(false);

  const createByClouster = () => {
    if (!showCreateByClouster) {
      setShowCreateByClouster(true);
      // console.log("mostrar model created showCreateByClouster");
    } else {
      setShowCreateByClouster(false);
    }
  };

  const btnCreated = () => {
    return (
      <>
        <Buttonatom
          created={createdSeller}
          title={"Crear Vendedor"}
          color={"success"}
          ico={"fa-circle-plus"}
        />
        <Buttonatom
          created={createByClouster}
          title={""}
          color={"success"}
          ico={"fa-cloud-arrow-up"}
        />
        <Buttonatom
          created={refresh}
          title={""}
          color={"info"}
          ico={"fa-arrow-rotate-right bx-spin-hover"}
        />
      </>
    );
  };
  const listAvailable = () => {
    return (
      <>
        {/* <Formselectatom title={"Ver Rutas Disponibles"}
                    iterador={route}
                    firstdata={"id"}
                    secunddata={"dia"}
                    disabledAction={true} /> */}
      </>
    );
  };

  const search = (data) => {
    const filteredList = sellerRedux.filter(
      (item) =>
        item.name?.toLowerCase().includes(data.toLowerCase()) ||
        item.code?.toLowerCase().includes(data.toLowerCase()) ||
        (item.isActive === true ? "si" : "no") === data.toLowerCase()
    );
    dispatch(setPagination(filteredList));
  };

  const refresh = () => {
    dispatch(getSellerThunk());
  };

  return (
    <div className="sellers pages">
      <div>
        <h2>Vendedores</h2>
        <Functionalitiesbtn
          buttons={btnCreated}
          listAvailable={listAvailable}
          search={search}
        />
      </div>
      <div>
        <TableSellers
          data={pagination}
          updateData={updateData}
          deleteData={deleteData}
        />
        {!loading ? <Paginationdesign data={"seller"} /> : <LoadingScreen />}
      </div>
      <CreateSeller show={modalShow} onHide={() => setModalShow(false)} />

      <CreateSellersClouster
        show={showCreateByClouster}
        onHide={() => setShowCreateByClouster(false)}
      />
    </div>
  );
};

export default Sellers;
