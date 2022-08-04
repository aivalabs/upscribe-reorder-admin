import React, { useContext, createContext, useState } from "react";
import { authenticate } from "./api";


export default function AuthProvider({ children }: any) {
   const auth = useAuthProvider();
   return (
     <authContext.Provider value={auth}>
       {children}
     </authContext.Provider>
   );
}

const authContext = createContext<any>(null);

export function useAuth() {
   return useContext(authContext);
}

export function useAuthProvider() {  
   const authToken = localStorage.getItem("auth_token"); 
   const [token, setToken] = useState<any>(authToken); 

   const signin = (username: string, password: string, cb: Function) => {
      return new Promise((resolve) => {
         authenticate(username, password).then((data: any) => {
            const newAuthToken: any = data?.data?.auth_token;
            if(newAuthToken) {
               localStorage.setItem('auth_token', newAuthToken);
               setToken(newAuthToken)
               cb();
               return resolve({
                  token: newAuthToken,
                  message: "Successfully logged in",
                  status: data.status
               })
            }
         }).catch((err) => {
            console.log(err.message, 'err')
            localStorage.removeItem('auth_token');
            setToken(null);        
            return resolve({
               message: err.message,
               status: err?.response?.status,
               errors: err?.response?.data?.errors || err?.response?.data?.error
            })
         });  
      })
         
   };
 
   const signout = (cb: Function) => {
      localStorage.removeItem('auth_token');
      setToken(null);
      cb();
   };
 
   return {
     token,
     signin,
     signout
   };
}


