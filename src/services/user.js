import axios from "axios";

const API_URL = "http://localhost:8080/sp/sample/";

const getAdminContent = () => {
    return axios.get(API_URL + "admin")
}

const getStaffContent = () => {
    return axios.get(API_URL + "staff")
}

const getAgentContent = () => {
    return axios.get(API_URL + "agent")
}

const getPublicContent = () => {
    return axios.get(API_URL + "all")
}

const UserService = {
    getAdminContent, getStaffContent, getAgentContent, getPublicContent
}

export default UserService;