import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const Member = () => {
    const { store, actions } = useContext(Context);
    console.log("Prueba", store.dataProduct ? store.dataProduct[0].type : null);
    return (
        <div className="text-center">
            <div>
                <h1>Welcome Member!</h1>
            </div>

        </div>
    );
};

export default Member;