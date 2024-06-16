import React, {Fragment, useState} from 'react'
import axios from 'axios'
import { Link,Navigate } from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../../actions/alert'
import {login}  from '../../../actions/auth'
import PropTypes from 'prop-types'
const Login = ({login,isAuthenticated}) => {

    const [formInput,setFormInput] = useState({email:'',password:''})
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const {email,password} = formInput
    const onChange = e => setFormInput({...formInput,[e.target.name]:e.target.value})
    const onSubmit = async e => {
        e.preventDefault();
       login({email,password});
        
    }

    
    
  return isAuthenticated ? <Navigate to="/dashboard" />: (
    <Fragment>
    <section className="container">
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead"><i class="fas fa-user"></i> Login To Your Account</p>
          <form className="form" onSubmit = {e=>onSubmit(e)}>
            <div className="form-group ">
              <input type="email"
               placeholder="Email Address"
                value={email}
                onChange={e => onChange(e)}
                name="email" 
                required/>
            </div>
            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => onChange(e)}
                name="password"
                minLength="4"
              />

    <button type ="button" onClick={togglePasswordVisibility} className="toggle-button">
    <span class="password-toggle-icon"><i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></span>
      </button>
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p class="my-1">
            Don't have an account ? <Link to ="/register">Sign Up</Link>
          </p>
        </section>
        </Fragment>

  )   
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login);