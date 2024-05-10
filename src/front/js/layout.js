import React, { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Context } from "./store/appContext";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Admin from "./pages/admin";
import Member from "./pages/member";
import Coach from "./pages/coach";
import Guest from "./pages/guest";
import Adminview from "./pages/adminview";
import Usersmanagment from "./pages/usersmanagment";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    // Obtener el contexto para verificar el rol del usuario
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if (!store.logged) {
            actions.verifyAuthToken();
            console.log("1")
        }
    }, [store.logged]);

    const navigate = () => {
        return ;
    };

    const isAdmin = store.logged && store.user && store.user.rol === "admin";
    console.log(store.logged)
    console.log(store.user)
    console.log(isAdmin)
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Admin />} path="/admin" />
                        <Route element={isAdmin ? <Adminview /> :  () => <Navigate to="/login" />} path={"/adminview"} />
                        <Route element={isAdmin ? <Usersmanagment /> : () => <Navigate to="/login" />} path={"/usersmanagment"} />
                        <Route element={<Member />} path="/member" />
                        <Route element={<Coach />} path="/coach" />
                        <Route element={<Guest />} path="/guest" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);