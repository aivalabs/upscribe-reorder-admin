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

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>          
            <Header />
            <Switch>
              <Route path="/custom-apps"><CustomApps /></Route>
              <Route path="/"><Analytics /></Route>
            </Switch>            
            <Footer />  
        </div>
      </div>
    </div>      
  );
}

export default App;
