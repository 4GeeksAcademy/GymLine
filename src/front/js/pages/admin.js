import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const Admin = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllUsers()
    }, []);

    console.log("This Data", store.dataClub)

    return (
        <div className="text-center">
            <div>
                <h1>Welcome Admin!</h1>
            </div>
        </div>
    );
};

export default Admin;