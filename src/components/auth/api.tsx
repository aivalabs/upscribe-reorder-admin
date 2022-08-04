import axios from "axios";

export const authenticate = async (username: string, password: string) => {
   return await axios.post("https://upscribe-repeat-mvp.herokuapp.com/master-admin/login", { user_name: username, password });
}