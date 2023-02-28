import { configureStore } from '@reduxjs/toolkit'
import  isLoadingSlice from './slices/isLoading.slice'
import  userLogedSlice  from './slices/userLoged'
import  vehiclesSlice from './slices/vehicles.slice'
import  paginationSlices  from './slices/pagination.slice'
import sellersSlice from './slices/seller.slice'
import billsReceivableSlice from './slices/billsReceivable.slice'
import closeoutsSlice from './slices/closeouts.slice'
import customerSlice from './slices/customer.slice'
import errorReceivedSlice from './slices/errorReceived.slice'
import dataTempSlice from './slices/dataTemp.slice'

export default configureStore({
    reducer: {
        userLoged : userLogedSlice,
        isLoading: isLoadingSlice,
        vehicle: vehiclesSlice,
        pagination: paginationSlices,
        seller: sellersSlice,
        customer:customerSlice,
        closeouts:closeoutsSlice,
        billReceivable:billsReceivableSlice,
        errorReceived: errorReceivedSlice,
        temporary: dataTempSlice
    }
})