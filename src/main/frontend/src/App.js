import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import { GLogin } from './features/auth/GLogin';
import { Homepage } from './features/homepage/Homepage';


function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path='/login' component={GLogin} /> */}
        <Route path='/' component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
