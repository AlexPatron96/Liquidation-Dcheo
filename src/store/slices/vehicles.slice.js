import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from "../../utils/getConfig";
import resources from "../../utils/resources";
import { setErrorReceived } from './errorReceived.slice';

const URL_BASE = resources.URL_BASE;

export const vehiclesSlice = createSlice({
    name: 'vehicle',
    initialState: [],
    reducers: {
        setVehicle: (state, action) => {
            return action.payload
        },
    }
})

//Req todos los Vehiculos 
export const getVehiclesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    axios.get(`${URL_BASE}/api/v1/vehicles/all`, getConfig())
        .then(res => {
            dispatch(setVehicle(res.data.result));
        })
        .catch(err => {
            console.log("Error en Slice");
            dispatch(setErrorReceived(err.response?.data));
        })
        .finally(() => dispatch(setIsLoading(false)))
};

export const postVehiclethunk = (data) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(`${URL_BASE}/api/v1/vehicles/new`, data, getConfig())
        .then((res) => {
            alert("Se creo el vehiculo "+data.placa)
            console.log("Se a creado un nuevo vehiculo");
            dispatch(getVehiclesThunk());
        })
        .catch(err => {
            alert("Error al crear el vehiculo")
            console.log("Error en Slice");
            dispatch(setErrorReceived(err.response?.data));
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const updateVehThunk = (id, data) => (dispatch) => {
    console.log(data);
    dispatch(setIsLoading(true));
    return axios.put(`${URL_BASE}/api/v1/vehicles/${id}/update`, data, getConfig())
        .then((res) => {
            alert(`Se actualizo el vehiculo ${data.placa}`)
            dispatch(getVehiclesThunk());
            console.log(res.data.result);
        })
        .catch(err => {
            alert("No se pudo actualizar el vehiculo "+data.placa)
            console.log("error en veh slice");
            dispatch(setErrorReceived(err.response?.data));
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteVehThunk = (id, data) => (dispatch) => {
    console.log(data);
    dispatch(setIsLoading(true));
    return axios.delete(`${URL_BASE}/api/v1/vehicles/${id}/del`, getConfig())
        .then((res) => {
            alert(`Se elimino el vehiculo ${data.placa}`)
            dispatch(getVehiclesThunk());
            console.log(res.data.result);
        })
        .catch(err => {
            console.log("error en veh slice");
            alert(`No Se pudo elimino el vehiculo`)
            dispatch(setErrorReceived(err.response.data));
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setVehicle } = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
