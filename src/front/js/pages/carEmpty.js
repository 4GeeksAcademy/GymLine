import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const CarEmpty = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="text-center">
            <div>
                <h1>Car Empty!</h1>
            </div>

        </div>
    );
};

export default CarEmpty;