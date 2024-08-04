import React , {Fragment, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Routes, Switch} from 'react-router-dom';
import NavBar from './components/layouts/NavBar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layouts/Alert';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{

useEffect(()=>{
  store.dispatch(loadUser());
},[]);

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
          {/* <PrivateRoute exact path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route element={<PrivateRoute />}></Route> */}
          <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/add-experience" element={<AddExperience />} />
          <Route path="/add-education" element={<AddEducation />} />
          </Route>

        </Routes>
      </section>
    </Fragment>
  </Router>
  </Provider>
    
     
  );
}

export default App;
