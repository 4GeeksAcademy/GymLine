import { jwtDecode } from "jwt-decode"
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            token: null,
            user: null,
            logged: null,
            products: [],
            dataProduct: null,
            users: null,
            clubs: null,
            dataClub: null,
            cart: [],
            counter: 0,
            total: 0,
            carshop: null
        },
        actions: {
            getProductCar: async (id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/shop_car/" + id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("The data", data);

                        let total = 0;
                        data.results.forEach(item => {
                            total += item.product.price;
                        });
                        total = parseFloat(total.toFixed(2));
                        setStore({
                            carshop: data.results,
                            total: total
                        });
                        return true;
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Get Product: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during Get Product in car");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred getting product in car", error);
                    return false;
                }
            },

            addProductCar: async (user_id, product_id) => {
                try {

                    const response = await fetch(process.env.BACKEND_URL + "/api/shop_car", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "user_id": user_id,
                            "product_id": product_id,
                        })
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Product Addition in Car Error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during product addition in car");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during product addition in car", error);
                    return false;
                }
            },

            deleteCar: async (id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/shop_car/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(response);

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Product Deletion Error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during product deletion");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during product deletion", error);
                    return false;
                }
            },


            getProducts: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/products", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("The data", data);
                        setStore({
                            products: data.results
                        });
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Get Products: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during Get Products");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred getting products", error);
                    return false;
                }
            },

            getDataProduct: async (id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/product/" + id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("The data", data);
                        setStore({
                            dataProduct: data.results[0]
                        });
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Get Product: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during Get Product");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred getting product", error);
                    return false;
                }
            },

            createProduct: async (dataProduct, dataPrice, dataImage_product, dataDescription, dataType, dataStock) => {
                try {
                    console.log(dataProduct, dataPrice, dataImage_product, dataDescription, dataType, dataStock)
                    const response = await fetch(process.env.BACKEND_URL + "/api/product", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "product": dataProduct,
                            "price": dataPrice,
                            "image_product": dataImage_product,
                            "description": dataDescription,
                            "type": dataType,
                            "stock": dataStock
                        })
                    });
                    //console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        //console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Product Creation Error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during product creation");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during product creation", error);
                    return false;
                }
            },

            modifyProduct: async (id, dataProduct = null, dataPrice = null, dataImage_product = null, dataDescription = null, dataType = null, dataStock = null) => {
                try {
                    console.log(dataProduct, dataPrice, dataImage_product, dataDescription, dataType, dataStock);

                    const requestBody = {};

                    if (dataProduct !== null) requestBody.product = dataProduct;
                    if (dataPrice !== null) requestBody.price = dataPrice;
                    if (dataImage_product !== null) requestBody.image_product = dataImage_product;
                    if (dataDescription !== null) requestBody.description = dataDescription;
                    if (dataType !== null) requestBody.type = dataType;
                    if (dataStock !== null) requestBody.stock = dataStock;

                    const response = await fetch(process.env.BACKEND_URL + `/api/product/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });

                    console.log(response);

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Product Modification Error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during product modification");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during product modification", error);
                    return false;
                }
            },

            deleteProduct: async (id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/product/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(response);

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Product Deletion Error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during product deletion");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during product deletion", error);
                    return false;
                }
            },

            getClubs: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/gyms", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("The data", data);
                        setStore({
                            clubs: data.results
                        });
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Get Clubs: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during Get Clubs");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred getting clubs", error);
                    return false;
                }
            },

            getDataClub: async (id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/gym/" + id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("The data", data);
                        setStore({
                            dataClub: data.results
                        });
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Get Club: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during Get Gym");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred getting gym", error);
                    return false;
                }
            },

            createClub: async (dataCity, dataGym, dataAddress, dataPhone, dataEmail, dataUrl) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/gym", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "city": dataCity,
                            "gym": dataGym,
                            "address": dataAddress,
                            "phone": dataPhone,
                            "email": dataEmail,
                            "url": dataUrl
                        })
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Gym Creation Error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during Gym creation");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during Gym creation", error);
                    return false;
                }
            },

            modifyClub: async (id, dataCity = null, dataGym = null, dataAddress = null, dataPhone = null, dataEmail = null, dataUrl = "URL") => {
                try {

                    const requestBody = {};

                    if (dataCity !== null) requestBody.city = dataCity;
                    if (dataGym !== null) requestBody.gym = dataGym;
                    if (dataAddress !== null) requestBody.address = dataAddress;
                    if (dataPhone !== null) requestBody.phone = dataPhone;
                    if (dataEmail !== null) requestBody.email = dataEmail;
                    if (dataUrl !== null) requestBody.url = dataUrl;

                    const response = await fetch(process.env.BACKEND_URL + `/api/gym/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });

                    console.log(response);

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Club Modification Error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during club modification");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during club modification", error);
                    return false;
                }
            },


            deleteClub: async (id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/gym/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(response);

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Club Deletion Error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during club deletion");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during club deletion", error);
                    return false;
                }
            },

            getDataUser: async (id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/user/" + id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("The data", data);
                        setStore({
                            userData: data.results[0]
                        });
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Get User: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during Get User");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred getting user", error);
                    return false;
                }
            },


            getAllUsers: async () => {
                const token = sessionStorage.getItem("token");
                console.log(token);
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/users", {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "*"
                        },
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("The data", data);
                        setStore({
                            users: data.results
                        });
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Get Users: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during Get Users");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred getting users", error);
                    return false;
                }
            },

            modifyUser: async (id, email = null, password = null, nickname = null, name = null, lastname = null) => {
                try {

                    const requestBody = {};

                    if (email !== null) requestBody.email = email;
                    if (password !== null) requestBody.password = password;
                    if (nickname !== null) requestBody.nickname = nickname;
                    if (name !== null) requestBody.name = name;
                    if (lastname !== null) requestBody.lastname = lastname;

                    const response = await fetch(process.env.BACKEND_URL + `/api/member/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });

                    console.log(response);

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`User Modification Error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during user modification");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during user modification", error);
                    return false;
                }
            },

            deleteUser: async (id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/member/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(response);

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`User Deletion Error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during user deletion");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during User deletion", error);
                    return false;
                }
            },

            login: async (dataEmail, dataPassword) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "email": dataEmail,
                            "password": dataPassword,
                        })
                    });
                    console.log("Este es el respone: " + response);
                    if (response.ok) {
                        const data = await response.json();

                        sessionStorage.setItem("token", data.token);
                        sessionStorage.setItem("userID", data.user.id);
                        // Decodificar el token JWT para obtener el rol del usuario
                        const token = data.token;
                        //console.log("Token ", token)
                        const decodedToken = jwtDecode(token);
                        //console.log("Token Decodificado ", decodedToken);
                        const userRole = decodedToken.sub.rol;
                        setStore({
                            user: data.user,
                            token: data.token,
                            logged: true
                        });
                        console.log("Data", data.user)
                        // Redirigir basado en el rol del usuario
                        const redirectMap = {
                            'admin': '/adminview',
                            'member': '/member',
                            'coach': '/coach',
                        };
                        const defaultRoute = '/guest'; // Ruta predeterminada si el rol no coincide
                        //window.location = redirectMap[userRole] || defaultRoute;
                        return true;

                    } else {
                        console.error("An error occurred during user login");
                        return false;
                    }

                } catch (error) {
                    console.error("An error occurred during user login", error);
                    return false;
                }

            },
            signup: async (dataEmail, dataPassword, dataName, dataLastname, dataNickname) => {
                try {
                    console.log(dataName, dataLastname, dataNickname, dataEmail, dataPassword)
                    const response = await fetch(process.env.BACKEND_URL+"/api/signup", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "email": dataEmail,
                            "password": dataPassword,
                            "nickname": dataNickname,
                            "name": dataName,
                            "lastname": dataLastname,
                            "rol": "member"
                        })
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        return true;
                    } else {
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Signup error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during user creation");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during user creation", error);
                    return false;
                }
            },
            verifyAuthToken: async () => {
                const token = sessionStorage.getItem("token");
                //console.log(token);
                if (!token) {
                    setStore({ logged: false });
                    //window.location = '/login';
                    return false;
                }
                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/protected", {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "*"
                        }
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setStore({
                            user: userData.response.user,
                            token: token,
                            logged: true
                        });

                    } else {
                        sessionStorage.removeItem("token");
                        setStore({ logged: false });
                        //window.location = '/login';
                    }



                } catch (error) {
                    console.error("Token validation failed", error);
                    sessionStorage.removeItem("token");
                    setStore({ logged: false });
                    // window.location = '/login';
                }
            },
            logout: () => {
                setStore({
                    user: null,
                    token: null,
                    logged: false,
                });
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userID");
            },
            addCart: (name, price) => {
                setStore({
                    cart: [...getStore().cart, name],
                    counter: getStore().counter + 1,
                    total: getStore().total + price
                });
            },
            deleteCart: (name, price) => {
                const currentcart = getStore().cart;
                const updatedcart = currentcart.filter((cart) => cart !== name);

                setStore({
                    cart: updatedcart,
                    counter: updatedcart.length,
                    total: getStore().total - price,
                });
            },


        }
    };
};
export default getState;