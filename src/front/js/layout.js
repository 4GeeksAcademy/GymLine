import React, { useContext, useEffect, useState } from "react";
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
import UsersmanagmentEdit from "./pages/usersmanagmentedit";
import Shop from "./pages/shop";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";
import Shopmanagment from "./pages/shopmanagment";
import ShopManagmentEdit from "./pages/shopmanagmentedit";
import ShopManagmentCreate from "./pages/shopmanagmentcreate";
import AccessDenied from "./pages/accesdenied";
import UserDetails from "./pages/userdetails";

import Cartempty from "./pages/cartempty"

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    const { store, actions } = useContext(Context);

    const isAdmin = store.user && store.user.rol === "admin";
    const isLoged = store.logged;

    return (
        <div className="d-flex flex-column min-vh-100 fondo">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <div className="flex-grow-1">
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Signup />} path="/signup" />
                            <Route element={<Login />} path="/login" />
                            <Route element={<Admin />} path="/admin" />
                            <Route element={<UserDetails />} path="/profile" />
                            <Route element={<AccessDenied />} path="/accesdenied" />
                            <Route element={isAdmin ? <Adminview /> : <Navigate to="/accesdenied" />} path={"/adminview"} />
                            <Route element={isAdmin ? <Usersmanagment /> : <Navigate to="/accesdenied" />} path={"/usersmanagment"} />
                            <Route element={isAdmin ? <Shopmanagment /> : <Navigate to="/accesdenied" />} path={"/shopmanagment"} />
                            <Route element={isAdmin ? <ShopManagmentCreate /> : <Navigate to="/accesdenied" />} path={"/shopmanagmentcreate"} />
                            <Route element={isAdmin ? <UsersmanagmentEdit /> : <Navigate to="/accesdenied" />} path={"/usermanagmentedit/:theid"} />
                            <Route element={isAdmin ? <ShopManagmentEdit /> : <Navigate to="/accesdenied" />} path={"/shopmanagmentedit/:theid"} />
                            <Route element={<Member />} path="/member" />
                            <Route element={<Coach />} path="/coach" />
                            <Route element={<Shop />} path="/shop" />
                            <Route element={<Guest />} path="/guest" />
                            <Route element={<Product />} path="/product/:uid" />
                            <Route element={isLoged ? <Cart /> : <Navigate to="/login" />} path="/cart" />
                            <Route element={<Cartempty />} path="/CarEmpty" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                    </div>

                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
