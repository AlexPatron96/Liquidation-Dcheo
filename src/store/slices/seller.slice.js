import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from "../../utils/getConfig";
import resources from "../../utils/resources";
import { setErrorReceived } from './errorReceived.slice';

const URL_BASE = resources.URL_BASE;
export const sellerSlice = createSlice({
    name: 'seller',
    initialState: [],
    reducers: {
        setSeller: (state, action) => {
            return action.payload
        }
    }
})

export const { setSeller } = sellerSlice.actions;

export const getSellerThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`${URL_BASE}/api/v1/seller/all`, getConfig())
        .then(res => {
            dispatch(setSeller(res.data.result));
            console.log("Recibe peticion Get");
        })
        .catch(err => {
            dispatch(setErrorReceived(err.response?.data));
            console.log("Error en Slice");
            alert("No se pudo actualizar la lista de clientes");
        })
        .finally(() => dispatch(setIsLoading(false)))
}

export const postSellerthunk = (data) => (dispatch) => {
    dispatch(setIsLoading(true));
    console.log(data);
    return axios.post(`${URL_BASE}/api/v1/seller/new`, data, getConfig())
        .then((res) => {
            dispatch(getSellerThunk());
            console.log("Se a creado un nuevo Vendedor");
            alert(`Se Creo  el Vendedor ${data.nombre}`)
        })
        .catch(err => {
            console.log("Error en Slice");
            alert("No se pudo actualizar el Vendedor");
            dispatch(setErrorReceived(err.response.data));
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const updateSellerThunk = (id, data) => (dispatch) => {
    console.log(data);
    dispatch(setIsLoading(true));
    return axios.put(`${URL_BASE}/api/v1/seller/${id}/update`, data, getConfig())
        .then((res) => {
            dispatch(getSellerThunk());
            dispatch(setDataTemp());
            console.log("Se Actualizo correctamente");
            alert(`Se actualizo el Vendedor ${data.nombre}`)
        })
        .catch(err => {
            console.log("error en veh slice");
            alert(`No Se pudo elimino el Vendedor`);
            dispatch(setErrorReceived(err.response.data));
        })
        .finally(() => dispatch(setIsLoading(false)));
}
export default sellerSlice.reducer;
