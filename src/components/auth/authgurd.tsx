import axios from 'axios';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./authprovider";


// if 401 then clear auth token and redirect to login page
axios.interceptors.response.use(response => {
  //console.log('response', response)
  return response
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});
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