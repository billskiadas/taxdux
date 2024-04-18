import './App.css'
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import {privateRoutes, publicRoutes} from "./components/routes.jsx";
import FallBackLoading from "./components/pages/FallBackLoading.jsx";
const SignIn = lazy(() => import("./components/pages/SignInPage.jsx"));

const App = () => {
    const userData = useSelector((state) => state.auth?.userData);

    return (
        <Suspense fallback={<FallBackLoading />}>
            <Routes>
                <Route element={<PrivateRoute userData={userData} />}>
                    {privateRoutes.map((route) => (<Route key={route.path} path={route.path} element={route.element} />))}
                </Route>

                {publicRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}

                <Route
                    path="/signin"
                    element={userData ? <Navigate to="/" /> : <SignIn />}
                />

            </Routes>
        </Suspense>
    );
};

export default App;

