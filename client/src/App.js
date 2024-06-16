import React , {Fragment, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Routes, Switch} from 'react-router-dom';
import NavBar from './components/layouts/NavBar';
import Landing from './components/layouts/Landing';
import Register from './components/layouts/auth/Register';
import Login from './components/layouts/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layouts/Alert';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{

useEffect(()=>{
  store.dispatch(loadUser());
});

  return (
<Provider store={store}>
  <Router>
    <Fragment>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
      <section className="container">
        <Alert />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </section>
    </Fragment>
  </Router>
  </Provider>
    
     
  );
}

export default App;
