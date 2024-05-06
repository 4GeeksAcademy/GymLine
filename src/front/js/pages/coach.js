import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const Coach = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.logged) {
            actions.verifyAuthToken();
        }
    }, [store.logged]);

    return (
        <div className="text-center">
            {store.logged ? (
                <div>
                    <h1>Welcome Coach!</h1>
                </div>
            ) : store.logged == false ? (
                <div>
                    <h1>Unauthorized</h1>
                    <p>You only could access with the correct credentials.</p>
                </div>
            ) : (
                <div>
                    <h1>Authenticating</h1>
                    <p>Checking..................</p>
                </div>
            )}
        </div>
    );
};

export default Coach;