import React, {Fragment, useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Link,Navigate } from 'react-router-dom'
import {setAlert} from '../../../actions/alert'
import {register} from '../../../actions/auth'
import PropTypes from 'prop-types'
const Register = ({setAlert,register,isAuthenticated}) => {

    const [formInput,setFormInput] = useState({name:'',email:'',password:'',passwordAgain:''})
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const {name,email,password,passwordAgain} = formInput
    const onChange = e => setFormInput({...formInput,[e.target.name]:e.target.value})
    const onSubmit = async e => {
        e.preventDefault()
        if(password !== passwordAgain)
        {
            setAlert('Password and confirm Password do not match','danger')
        }
        else{
            console.log('Success')
            register({name,email,password})
        }
    }
    
    
  return isAuthenticated ? <Navigate to="/dashboard" />: (
    <Fragment>
    <section className="container">
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead"><i class="fas fa-user"></i> Create Your Account</p>
          <form className="form" onSubmit = {e=>onSubmit(e)}>
            <div className="form-group">
              <input type="text" 
              placeholder="Name" 
                value={name}
                onChange={e => onChange(e)}
              name="name" 
            //   required 
              />
            </div>
            <div className="form-group ">
              <input type="email"
               placeholder="Email Address"
                value={email}
                onChange={e => onChange(e)}
                name="email" 
                // required
                />
              {/* <small class="form-text"
                >This site uses Gravatar so if you want a profile image, use a
                Gravatar email</small
              > */}
            </div>
            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => onChange(e)}
                name="password"
                // minLength="4"
              />

    <button type ="button" onClick={togglePasswordVisibility} className="toggle-button">
    <span class="password-toggle-icon"><i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></span>
      </button>
            </div>
            <div className="form-group password-group ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={passwordAgain}
                onChange={e => onChange(e)}
                name="passwordAgain"
                minLength="4"
              />
              <button type ="button" onClick={togglePasswordVisibility} className="toggle-button">
    <span class="password-toggle-icon"><i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></span>
        </button>
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p class="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </section>
        </Fragment>

  )   
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert,register}) (Register);