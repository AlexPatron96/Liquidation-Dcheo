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
import Sellers from "./routes/dashboard/Sellers";
import Customers from "./routes/dashboard/Customers";
import Selectvehliq from "./routes/dashboard/Liquidation/vehicles/Selectvehliq";
import Invoice from "./routes/dashboard/Invoice";
import ProtectedRoutes from './utils/ProtectedRoutes';
import Index from "./routes/dashboard/Liquidation/Index";
import Index2 from "./routes/dashboard/Liquidation/vehicles/Subindex";
import Liquidationveh from "./routes/dashboard/Liquidation/vehicles/Liquidationveh";

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
            <Route path="/dashboard/sellers" element={<Sellers />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/invoice" element={<Invoice />} />

            <Route path="/dashboard/liquidation" element={<Index />}>
              <Route path="/dashboard/liquidation/vehicles" element={<Index2 />}>
                <Route index element={<Selectvehliq />} />
                <Route path="/dashboard/liquidation/vehicles/:id" element={<Liquidationveh />} />
              </Route>
              {/* <Route path="/dashboard/liquidation/vehicles" element={<Index2 />}>
                <Route index element={<Selectvehliq />} />
                <Route path="/dashboard/liquidation/vehicles/:id" element={<Customers />} />
              </Route> */}
            </Route>

          </Route>
        </Route>

        <Route path="*" element={<Navigate replace to={"/dashboard"} />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

{/* <Route path="/dashboard/closeoutsVeh" element={<CloseoutsVeh />} />
  <Route path="/dashboard/select-vehicle-to-liquidate" element={<Selectliqsell />} />
  <Route path="/dashboard/do-vehicleliquidation" element={<Dovehicleliquidation />} />
  <Route path="/dashboard/do-sellerliquidation" element={<Dovehicleliquidation />} />
<Route path="/dashboard/billreceivable" element={<Billreceivable />} /> */}