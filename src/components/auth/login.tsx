import { useState } from "react";
import {
  useHistory,
  useLocation,
  Redirect
} from "react-router-dom";
import PageTitle from "../common/snippets/page-title";

import { useAuth } from "./authprovider";

export default function LoginPage() {
   let history = useHistory<any>();
   let location = useLocation<any>();
   let auth = useAuth();
 
   const [username, setUsername] = useState("");
   const [pasasword, setPassword] = useState("");
   const [errors, setErrors] = useState<any[]>([]);

   let { from } = location.state || { from: { pathname: "/" } };
   let login = (e: any) => {
      e.preventDefault();
      if(!username || !pasasword) return setErrors(["Username and password are required"]);
      auth.signin(username, pasasword, () => history.replace(from))
      .then((data: any) => {
         if(data?.errors) return setErrors(typeof data.errors === 'object' ? [data.errors] : data.errors);
      })
      .catch((err: any) => {
         return setErrors([err.message]);
      });
   };

   const handleUsernameChange = (e: any) => {
      setUsername(e.target.value);
   }

   const handlePasswordChange = (e: any) => {
      setPassword(e.target.value);
   }
   
   return (
      <>
      {auth.token ? <Redirect to={from} /> : <div className="row">
         <div className="col-12 col-md-6 offset-md-3">
               <PageTitle title="Upscribe Reorder Master Admin Login" />
               {errors.length > 0 && <div className="col-12">
                  <div className="alert alert-danger d-flex align-items-start flex-column" role="alert">            
                     {errors.map((error: any, index: number) => (
                        <div key={index}>{error?.message || JSON.stringify(error)}</div>
                     ))}
                  </div>
               </div>}
               <form className="mt-3" onSubmit={login}>
                  <div className="mb-3">
                     <label htmlFor="user_name" className="form-label">Username</label>
                     <input type="text" className="form-control" id="user_name" onChange={handleUsernameChange}/>
                  </div>
                  <div className="mb-3">
                     <label htmlFor="password" className="form-label">Password</label>
                     <input type="password" className="form-control" id="password" onChange={handlePasswordChange}/>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
               </form>
         </div>
      </div>}
      </> 
   );
 }
 
 