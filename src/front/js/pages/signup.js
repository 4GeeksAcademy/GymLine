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

    const handleSignup = async() => {
       let result = await actions.signup(email, password, name, lastname, nickname)
       if (result) {
        navigate("/login")
       }
       else {
        setError("Error occurred, while signing you up")
       }
    };

    return (
        <div className="container">
            <div className="row border border-primary">
                <div className="col-md-12 offset-md-3 ">
                    <br/>
                    <h2>CREA YA TU CUENTA!</h2>
                    <br/>
                    <form className="mx-auto" style={{ width: '100%' }}>
                    <div className="d-flex"> 
                            <div className="d-flex flex-row align-items-center mb-4">
                            <i class="fa-solid fa-user-tie fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        placeholder="Introduce un álias"
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
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
                            
                            <div className="d-flex flex-row align-items-center mb-4">
        
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
                            <div className="d-flex flex-row align-items-center mb-7 border border-primary">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="correo electronico"
                                    />
                                </div>
                            </div>
                            
                            <div className="d-flex flex-row align-items-center mb-5 border border-primary">
                                <i className="fas fa-lock fa-lg me-3 fa-fw ps-3"></i>
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
        </div>
    );
};

export default Signup;