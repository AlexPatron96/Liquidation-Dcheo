import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';
import { setUserLoged } from '../../store/slices/userLoged';


const Dashboard = () => {

    const dispatch = useDispatch();
    console.log("Ingreso a la Aplication");
    const storedUser = localStorage.getItem('userLiquidation');
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        dispatch(setUserLoged(user));
    }, [])

    return (
        <div>
            <NavBar />
            <Sidebar />
            <section>
                <Outlet />
            </section>
        </div>
    );
};

export default Dashboard;