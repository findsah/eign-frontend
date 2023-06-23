import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { NodeFetchHelper } from '../../config/utils/NodeFetchHelper';
import logingoogle from '../../assets/icons/l-google.png';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { ServerCallings } from '../../config/utils/ServerCallings';
import { login } from './service/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllProperties } from '../../pages/search/service/GetAllPropertiesApi';

const LoginModal = ({ show, onHide, welcomeMessage, hideLoginShowSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectFields, setIncorrectFields] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState('');
  const [goodone, setGoodone] = useState(false);
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch()
  const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !email || !password ) {
      setError('Please fill out all fields.')
      return;
    } else if (!emailRegExp.test(email)) {
      setError('Email is not valid.')
      return;
    } 
    setLoader(true);
 try {
   const userData = { email, password };
   const response = await dispatch(login(userData));
   console.log('userResponse', response);
   if (response.payload.token) {
    sessionStorage.setItem('token', response.payload.token);
    sessionStorage.setItem('user_id', response.payload.user_id);
    sessionStorage.setItem('userName', response.payload.name);
    toast.success('Account Loggedin successfully!')
    dispatch(getAllProperties())
    setEmail("");
    setPassword('');
    setLoader(false)

    onHide(false)                  
  } else{
    setLoader(false)
    toast.error('Invalid email or password!')  
    setIncorrectFields('Incorrect email or password!');
    } 
 } catch (error) {
   // Handle error
   console.log(error);
 }
  };
  // const responseGoogle = response => {
  //   console.log(response);

  // };
  const responseGoogle = async (response) => {
    console.log(response);
    setLoader(true)

    try {
      const userData = {
        email: response.profileObj.email,
        password: response.googleId,
      };
      const loginResponse = await dispatch(login(userData));
      if (loginResponse.payload.token) {
        toast.success('Account Logged in successfully!');
        setEmail("");
        setPassword('');
        setLoader(false);
        onHide(false);
      } else {
        setLoader(false);
        toast.error('Invalid email or password!');  
        setIncorrectFields('Incorrect email or password!');
      } 
    } catch (error) {
      console.error('error',error);
    }
  };
  

  const componentClicked = () => {
    console.log('clicked');
  };

  const responseFacebook = response => {
    console.log(response);
    setGoodone(true);
    setUserID(response.userID);
    setUserName(response.name);
    setUserEmail(response.email);
    setUserPicture(response.picture);
  };
  const handleInputChange = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };
  return (
    <Modal centered show={show} onHide={onHide} className='login-modal'>
      <Modal.Body>
        <div className='main'>
          <h1>Login</h1>
          <p>
            Don't have an account yet?
            <span onClick={hideLoginShowSignUp}>Create it now</span>
          </p>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            // buttonText='Login'
            className='google'
            buttonText='Continue with Google'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          {/* {goodone ? (
            <div>Login successful</div>
          ) : (
            <FacebookLogin
              className='kep-login-facebook'
              buttonText=' '
              appId='1649884398528490'
              fields='name,email,picture'
              onClick={componentClicked}
              callback={responseFacebook}
            />
          )} */}
        </div>
        <p>or enter with your email</p>
        <form onSubmit={handleSubmit}>

        <div className="maildiv">
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="mailbox"
              onChange={handleInputChange}
            />
            <i className="fa fa-envelope-square loginmail" />
          </div>
          {error && (
            <div className="error">
              {email === ""
                ? "Please enter your email."
                : !emailRegExp.test(email)
                ? "Email is not valid."
                : ""}
            </div>
          )}
          <div className="paswdiv">
            <input
              value={password}
              className="paswbox"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={handleInputChange}
            />
            <i className="fa fa-lock loginpassword" />
          </div>
          {error && (
            <div className="error">
              {password === ""
                ? "Please enter your password."
                : password.length < 8
                ? "Password must contain at least 8 characters."
                : ""}
            </div>
          )}
          <div className="showme">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label>Remember me</label>
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"} password
            </span>
          </div>
          {loginSuccessful && <div className="success">{loginSuccessful}</div>}
          {incorrectFields && (
            <div className="error-incorrect">{incorrectFields}</div>
          )}
          <button className="loginbtn" type="submit">
            {loader ? <Spinner animation="grow" /> : "Log in"}
          </button>
          </form>
        <p className="forget">
          <a href="/">Did you forget your password? </a>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal



