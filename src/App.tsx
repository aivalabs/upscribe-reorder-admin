import React from 'react';
import {
  Switch,  
  Route  
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Header from './components/common/header';
import Footer from './components/common/footer';
import Analytics from './components/analytics/analytics';
import CustomApps from './components/customapps/custom-apps';
import AuthProvider from './components/auth/authprovider';
import AuthGurd from './components/auth/authgurd';
import LoginPage from './components/auth/login';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <div className='container'>
          <div className='row'> 
              <Header />
                <Switch>
                  <Route exact path="/login" ><LoginPage /></Route>
                  <AuthGurd path="/custom-apps"><CustomApps /></AuthGurd>
                  <AuthGurd path="/"><Analytics /></AuthGurd>
                </Switch>            
              <Footer />  
          </div>
        </div>
      </div>   
    </AuthProvider>   
  );
}

export default App;
