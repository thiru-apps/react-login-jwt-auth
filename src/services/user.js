import axios from "axios";

const API_URL = "http://localhost:3000/api/test/";

const getAdminContent = () => {
    return axios.get(API_URL + "admin")
}

const getStaffContent = () => {
    return axios.get(API_URL + "staff")
}

const getAgentContent = () => {
    return axios.get(API_URL + "agent")
}

const UserService = {
    getAdminContent, getStaffContent, getAgentContent
}

export default UserService;