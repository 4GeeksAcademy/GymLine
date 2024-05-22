import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        let result = await actions.signup(email, password, name, lastname, nickname)
        if (result) {
            navigate("/login")
        }
        else {
            setError("Error occurred, while signing you up")
        }
    };

    return (
        <div className="login-container">
            <div className="sign-form col-12">
                <br />
                <h2>CREA YA TU CUENTA!</h2>
                <br />
                <form /* className="mx-auto" *//*  style={{ width: '100%' }} */>
                    <div className="d-flex">
                        <div className="d-flex flex-row align-items-center mb-4">

                            <div className="form-outline flex-fill mb-0 col-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="Álias"
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4 col-4">
                            <div className="form-outline flex-fill mb-0 ps-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nombre"
                                />
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-4">

                            <div className="form-outline flex-fill mb-0 ps-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    placeholder="Apellidos"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        {/* <div className="d-flex flex-row align-items-center mb-7 col-7"> */}
                            <div className="form-group col-7  align-items-center mb-7 me-1 ">
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="correo electronico"
                                />
                            </div>
                        {/* </div> */}

                        <div className="d-flex flex-row align-items-center mb-5 col-5">
                            <div className="form-outline flex-fill mb-0">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                />
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={handleSignup} className="btn btn-primary">
                        Register
                    </button>
                    {error && <p className="text-danger">{error}</p>}
                </form>
            </div>
        </div>

    );
};

export default Signup;