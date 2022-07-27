import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Header from './components/common/header';
import Footer from './components/common/footer';
import Analytics from './components/analytics/analytics';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <Header />
            <Analytics />
          <Footer />          
        </div>
      </div>
    </div>
  );
}

export default App;
