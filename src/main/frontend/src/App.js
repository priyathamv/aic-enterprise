import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import { GLogin } from './features/auth/GLogin';
import { Navbar } from './features/navbar/Navbar';
import { Homepage } from './features/homepage/Homepage';
import { Footer } from './features/homepage/common/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* <Route path='/login' component={GLogin} /> */}
        <Route path='/' component={Homepage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
