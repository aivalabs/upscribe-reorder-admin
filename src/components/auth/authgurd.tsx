import { useAuth } from "./authprovider";
import { Route, Redirect } from "react-router-dom";
export default function AuthGurd({ children, ...rest }: any) {
   let auth = useAuth();
   return (
     <Route
       {...rest}
       render={({ location }) =>
         auth.token ? (
           children
         ) : (
           <Redirect
             to={{
               pathname: "/login",
               state: { from: location }
             }}
           />
         )
       }
     />
   );
 }