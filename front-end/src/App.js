import React from 'react';
import {BrowserRouter as Router, Route,  Switch} from "react-router-dom";
import HomeScreen from './components/screens/home';
import LoginForm from './components/forms/login';
import PrivateRoute from './PrivateRoute';





function App() {
  


  return (
    
    
      <Router>
        
        <Switch>
        <Route exact  path="/login" component={LoginForm} />
        <PrivateRoute exact path="/" component={HomeScreen} />
        </Switch>
        
      </Router>
    
    
    
  );
}

export default App;
