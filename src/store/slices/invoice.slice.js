import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from "../../utils/getConfig";
import resources from "../../utils/resources";
import { setErrorReceived } from './errorReceived.slice';
import { setSuccess } from './Success.slice';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
const URL_BASE = resources.URL_BASE;
export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: [],
  reducers: {
    setInvoice: (state, action) => {
      return action.payload;
    }
  }
})

export const { setInvoice } = invoiceSlice.actions;

export const getInvoiceThunk = () => (dispatch) => {
  dispatch(setIsLoading(true))
  axios.get(`${URL_BASE}/api/v1/invoice/all`, getConfig())
    .then(res => {
      dispatch(setInvoice(res.data.result));
      console.log("Recibe Peticion Get invoice");
    })
    .catch(err => {
      dispatch(setErrorReceived(err.response?.data));
      console.log("Error en Slice invoice");
    })
    .finally(() => dispatch(setIsLoading(false)))
};

export const postInvoicethunk = (data) => (dispatch) => {
  dispatch(setIsLoading(true));
  console.log(data);
  return axios.post(`${URL_BASE}/api/v1/invoice/new`, data, getConfig())
    .then(() => {
      dispatch(getInvoiceThunk());
      dispatch(setSuccess("success"));
    })
    .catch(err => {
      dispatch(setSuccess("error"));
      dispatch(setErrorReceived(err.response?.data));
    })
    .finally(() => dispatch(setIsLoading(false)));
}

export const updateInvoiceThunk = (id, data) => (dispatch) => {
  console.log(data);
  dispatch(setIsLoading(true));
  return axios.put(`${URL_BASE}/api/v1/invoice/${id}/update`, data, getConfig())
    .then((res) => {
      dispatch(setSuccess("success"));
      dispatch(getInvoiceThunk());
    })
    .catch(err => {
      dispatch(setSuccess("error"));
      dispatch(setErrorReceived(err.response?.data));
    })
    .finally(() => dispatch(setIsLoading(false)));
}

export const deleteInvoiceThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.delete(`${URL_BASE}/api/v1/invoice/${id}/del`, getConfig())
    .then((res) => {
      dispatch(setSuccess("success"));
      dispatch(getInvoiceThunk());
      console.log(res.data.result);
    })
    .catch(err => {
      dispatch(setSuccess("error"));
      dispatch(setErrorReceived(err.response.data));
    })
    .finally(() => dispatch(setIsLoading(false)));
}
export default invoiceSlice.reducer;
