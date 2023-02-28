import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';
import { getVehiclesThunk } from '../../store/slices/vehicles.slice';
import { getSellerThunk } from '../../store/slices/seller.slice';
import { getCustomerThunk } from '../../store/slices/customer.slice';
import { setUserLoged } from '../../store/slices/userLoged';

const Dashboard = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        console.log("Ingreso a la Aplication");
        const storedUser = localStorage.getItem('userLiquidation');
        const user = storedUser ? JSON.parse(storedUser) : null;
        dispatch(setUserLoged(user));
        dispatch(getVehiclesThunk());
        dispatch(getSellerThunk());
        dispatch(getCustomerThunk());
    }, [])



    return (
        <div>
            Liquidation app
            <NavBar />
            <Sidebar />
            <section>
                <Outlet />
            </section>
        </div>
    );
};

export default Dashboard;