import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';
export const authenticate = async (username: string, password: string) => {
   return await axios.post(`${API_HOST}/master-admin/login`, { user_name: username, password });
}