import axios from 'axios';

const API_URL = "http://localhost:8080/sp/auth/";

const register = (username, email, password, phone, location) => {
    return axios.post(API_URL + "register", {
        username, email, password, phone, location
    });
};


const login = async (username, password) => {
    const response = await axios.post(API_URL + "login", {
        username, password
    });
    if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "logout").then((response) => {
        return response.data;
    })
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

const AuthService = {
    register, login, logout, getCurrentUser
}

export default AuthService;