import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "bootswatch/dist/litera/bootstrap.min.css";
// import { useEffect } from "react";
import LoadingScreen from './layout/LoadingScreen';
import { useSelector } from 'react-redux';
import Login from '../src/routes/auth/Login';
import Sigin from "./routes/auth/Sigin";
import Dashboard from "./routes/dashboard/Dashboard";
import Home from "./routes/dashboard/Home";
import Vehicles from "./routes/dashboard/Vehicles";
// import Sellers from "./routes/dashboard/Sellers";
// import Customers from "./routes/dashboard/Customers";
// import Billreceivable from "./routes/dashboard/Billreceivable";
// import CloseoutsVeh from "./routes/dashboard/CloseoutsVeh";
// import Dovehicleliquidation from "./routes/dashboard/Dovehicleliquidation";
// import Selectliqveh from "./routes/dashboard/Selectliqveh";
// import Selectliqsell from "./routes/dashboard/Selectliqsell";
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  const isLoading = useSelector(state => state.isLoading)

  

  return (
    <BrowserRouter>
      {isLoading && <LoadingScreen />}
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Sigin />} />

        <Route element={<ProtectedRoutes />}>

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="/dashboard/vehicles" element={<Vehicles />} />
            {/* <Route path="/dashboard/sellers" element={<Sellers />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/closeoutsVeh" element={<CloseoutsVeh />} />
            <Route path="/dashboard/selectliqveh" element={<Selectliqveh />} />
            <Route path="/dashboard/selectliqsell" element={<Selectliqsell />} />
            <Route path="/dashboard/do-vehicleliquidation" element={<Dovehicleliquidation />} />
            <Route path="/dashboard/do-sellerliquidation" element={<Dovehicleliquidation />} />
            <Route path="/dashboard/billreceivable" element={<Billreceivable />} /> */}
          </Route>

        </Route>

        <Route path="*" element={<Navigate replace to={"/dashboard"} />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
