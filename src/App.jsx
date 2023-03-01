import "./App.css";
import "bootswatch/dist/litera/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "./error-page";

import Index from "./routes/Index";
import Login from './routes/auth/Login';
import Sigin from './routes/auth/Sigin';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/sigin",
        element: <Sigin />,
      },
    ],

  },
]);




function App() {
  const isLoading = useSelector(state => state.isLoading)
  return (
    < RouterProvider router={router} />
  );
}

export default App;

// import { BrowserRouter } from 'react-router-dom';
// import { HashRouter , Routes, Route, Navigate } from 'react-router-dom';
// // import { useEffect } from "react";
// import LoadingScreen from './layout/LoadingScreen';
// import { useSelector } from 'react-redux';
// import Sigin from "./routes/auth/Sigin";
// import Dashboard from "./routes/dashboard/Dashboard";
// import Home from "./routes/dashboard/Home";
// import Vehicles from "./routes/dashboard/Vehicles";
// import Sellers from "./routes/dashboard/Sellers";
// // import Customers from "./pages/dashboard/Customers";
// // import Billreceivable from "./pages/dashboard/Billreceivable";
// // import CloseoutsVeh from "./pages/dashboard/CloseoutsVeh";
// // import Dovehicleliquidation from "./pages/dashboard/Dovehicleliquidation";
// // import Selectliqveh from "./pages/dashboard/Selectliqveh";
// // import Selectliqsell from "./pages/dashboard/Selectliqsell";
// import ProtectedRoutes from './utils/ProtectedRoutes';
    // <HashRouter>
    //   {isLoading && <LoadingScreen />}
    //   <Routes>
    //     {/* <Route path="/" element={<Dashboard />} /> */}

    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signin" element={<Sigin />} />

    //     <Route element={<ProtectedRoutes />}>
    //       <Route path="/" element={<Dashboard />}>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/vehicles" element={<Vehicles />} />
    //         <Route path="/sellers" element={<Sellers />} />
    //         {/* <Route path="/dashboard/customers" element={<Customers />} />
    //         <Route path="/dashboard/closeoutsVeh" element={<CloseoutsVeh />} />
    //         <Route path="/dashboard/selectliqveh" element={<Selectliqveh />} />
    //         <Route path="/dashboard/selectliqsell" element={<Selectliqsell />} />
    //         <Route path="/dashboard/do-vehicleliquidation" element={<Dovehicleliquidation />} />
    //         <Route path="/dashboard/do-sellerliquidation" element={<Dovehicleliquidation />} />
    //         <Route path="/dashboard/billreceivable" element={<Billreceivable />} /> */}
    //       </Route>
    //     </Route>

    //     <Route path="*" element={<Navigate replace to={"/"} />} />
    //   </Routes>

    // </HashRouter>