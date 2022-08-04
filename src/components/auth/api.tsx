import axios from "axios";

export const authenticate = async (username: string, password: string) => {
   return await axios.post("/master-admin/login", { user_name: username, password });
}