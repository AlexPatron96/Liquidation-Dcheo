import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "bootswatch/dist/litera/bootstrap.min.css";
// import { useEffect } from "react";
import LoadingScreen from './layout/LoadingScreen';
import { useSelector } from 'react-redux';
import Login from '../src/pages/auth/Login';
import Sigin from "./pages/auth/Sigin";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/dashboard/Home";
import Vehicles from "./pages/dashboard/Vehicles";
import Sellers from "./pages/dashboard/Sellers";
// import Customers from "./pages/dashboard/Customers";
// import Billreceivable from "./pages/dashboard/Billreceivable";
// import CloseoutsVeh from "./pages/dashboard/CloseoutsVeh";
// import Dovehicleliquidation from "./pages/dashboard/Dovehicleliquidation";
// import Selectliqveh from "./pages/dashboard/Selectliqveh";
// import Selectliqsell from "./pages/dashboard/Selectliqsell";
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  const isLoading = useSelector(state => state.isLoading)

  

  return (
    <BrowserRouter>
      {isLoading && <LoadingScreen />}
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}

        <Route path="https://main--zesty-pie-60c6ee.netlify.app/login" element={<Login />} />
        <Route path="https://main--zesty-pie-60c6ee.netlify.app//signin" element={<Sigin />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="https://main--zesty-pie-60c6ee.netlify.app/" element={<Dashboard />}>
            <Route path="https://main--zesty-pie-60c6ee.netlify.app/" element={<Home />} />
            <Route path="https://main--zesty-pie-60c6ee.netlify.app//vehicles" element={<Vehicles />} />
            <Route path="https://main--zesty-pie-60c6ee.netlify.app/sellers" element={<Sellers />} />
            {/* <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/closeoutsVeh" element={<CloseoutsVeh />} />
            <Route path="/dashboard/selectliqveh" element={<Selectliqveh />} />
            <Route path="/dashboard/selectliqsell" element={<Selectliqsell />} />
            <Route path="/dashboard/do-vehicleliquidation" element={<Dovehicleliquidation />} />
            <Route path="/dashboard/do-sellerliquidation" element={<Dovehicleliquidation />} />
            <Route path="/dashboard/billreceivable" element={<Billreceivable />} /> */}
          </Route>
        </Route>

        <Route path="*" element={<Navigate replace to={"/"} />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
