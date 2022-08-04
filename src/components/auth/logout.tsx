import { useHistory, Redirect } from "react-router-dom";
import { useAuth } from "./authprovider";
export default function Logout() {
   let history = useHistory();
   let auth = useAuth();
   if(!auth.token) return <Redirect to="/login" />
 
   return auth.token && <a href="/#" onClick={
      (e) => {
         e.preventDefault();
         auth.signout(() => history.push("/login"))
      }
      }>Sign out</a>
 }