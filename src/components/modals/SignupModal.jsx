import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// import {NodeFetchHelper} from '../../utils/NodeFetchHelper';

import logingoogle from "../../assets/icons/l-google.png";
import { ServerCallings } from "../../config/utils/ServerCallings";
import { registerUser } from "./service/authApi";
import { toast } from "react-toastify";
import EmailVerificationPopup from "./EmailVerificationPopup";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { gapi } from "gapi-script";

const SignupModal = ({ show, onHide, hideSignUpShowLogin }) => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const userres = sessionStorage.getItem("isSignup");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );
  const [state, setState] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    loader: false,
    alreadyExists: "",
    accountCreated: "",
    goodone: "",
  });
  useEffect(()=>{
    function start() {
      gapi.auth2.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope:""
      })
    }
    gapi.load('client:auth2',start)
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !password) {
      setError("Please fill out all fields");
      return;
    } else if (!emailRegExp.test(email)) {
      setError("Email is not valid");
      return;
    } else if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    setState((prevState) => ({ ...prevState, loader: true }));
    try {
      const userData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      };

      dispatch(registerUser(userData))
        .then((response) => {
          // Handle the successful response here
          if (response.payload.response) {
            onHide(false);
            setShowModal(true);
            toast.success("Please verify email");
            setState((prevState) => ({
              ...prevState,
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              alreadyExists: "",
              accountCreated: "",
            }));
          } else {
            toast.error("email already exist");
            setState((prevState) => ({
              ...prevState,
              loader: false,
              alreadyExists: "An account with that email already exists.",
            }));
          }
        })
        .catch((error) => {
          // Handle the error here
          console.error("error", error);
        });
    } catch (err) {
      console.error(err);
      setState((prevState) => ({
        ...prevState,
        error: "Error creating account. Please try again later.",
      }));
      setState((prevState) => ({ ...prevState, accountCreated: "" }));
      setState((prevState) => ({ ...prevState, alreadyExists: "" }));
    }
  };

  const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const {
    first_name,
    last_name,
    email,
    password,
    loader,
    alreadyExists,
    accountCreated,
    goodone,
  } = state;
  const responseGoogle = async (response) => {
    console.log(response);
    setState((prevState) => ({...prevState,loader: true}));
    try {
      const userData = {
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        email: response.profileObj.email,
        password: response.googleId,
 
      };
      dispatch(registerUser(userData))
     .then((response) => {
          // Handle the successful response here
          if (response.payload.response) {
            setLoginData(response);
            // localStorage.setItem('logedinUser', JSON.stringify(response.payload.response.name));
            onHide(false);
            setShowModal(true);
            toast.success("Please verify email");
            setState((prevState) => ({
              ...prevState,
              loader:false,
              first_name: "",
              last_name: "",
              password: "",
              alreadyExists: "",
              accountCreated: "",
            }));
          } else {
            toast.error("email already exist");
            setState((prevState) => ({
              ...prevState,
              loader:false,
              alreadyExists: "An account with that email already exists.",
            }));
          }
        })
        .catch((error) => {
          // Handle the error here
          console.error("error", error);
        });
    } catch (err) {
      console.error(err);
      setState((prevState) => ({
        ...prevState,
        error: "Error creating account. Please try again later.",
      }));
      setState((prevState) => ({ ...prevState, accountCreated: "" }));
      setState((prevState) => ({ ...prevState, alreadyExists: "" }));
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };
  const componentClicked = () => {
    console.log("clicked");
  };

  const responseFacebook = (response) => {
    console.log(response);
    // setGoodone(true);
    // setUserID(response.userID);
    // setUserName(response.name);
    // setUserEmail(response.email);
    // setUserPicture(response.picture);
  };
  return (
    <>
      <EmailVerificationPopup
        show={showModal}
        onHide={() => setShowModal(false)}
      />

      <Modal
        centered
        show={show}
        onHide={onHide}
        className="signup-modal login-modal"
      >
        <Modal.Body>
          <div className="main ">
            <h1>Register now</h1>
            <p className="title">
              Do you already have an account?
              <span onClick={hideSignUpShowLogin}> Log in</span>
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
          <p>or sign up with your email</p>
          <form onSubmit={handleSubmit}>
            <Row>
              {/* <Col lg={12} md={12} sm={12} xs={12}>
            <div className="namediv">
              <input
                type="text"
                value={name}
                className="namebox"
                placeholder="Name"
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
              <i className="fa fa-user nameimg" />
            </div>
            {error && name === "" ? (
              <div className="error">Please enter your  name.</div>
            ) : (
              ""
            )}
          </Col> */}
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className="namediv">
                  <input
                    type="text"
                    value={first_name}
                    className="namebox"
                    placeholder="First Name"
                    onChange={(e) =>
                      setState({ ...state, first_name: e.target.value })
                    }
                  />
                  <i className="fa fa-user nameimg" />
                </div>
                {error && first_name === "" ? (
                  <div className="error">Please enter your first name.</div>
                ) : (
                  ""
                )}
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className="namediv">
                  <input
                    type="text"
                    value={last_name}
                    className="namebox"
                    placeholder="Last Name"
                    onChange={(e) =>
                      setState({ ...state, last_name: e.target.value })
                    }
                  />
                  <i className="fa fa-user nameimg" />
                </div>
                {error && last_name === "" ? (
                  <div className="error">Please enter your last name.</div>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <div className="maildiv">
              <input
                type="email"
                value={email}
                placeholder="Email"
                className="mailbox"
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
              <i className="fa fa-envelope-square loginmail" />
            </div>
            {error ? (
              <div className="error">
                {email === ""
                  ? "Please enter your email."
                  : !emailRegExp.test(email)
                  ? "Email is not valid."
                  : ""}
              </div>
            ) : (
              ""
            )}
            <div className="paswdiv">
              <input
                type="password"
                value={password}
                className="paswbox"
                placeholder="Password"
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
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
              <label>
                <input
                  type="checkbox"
                  //   defaultChecked={isStaff}
                  onChange={(e) =>
                    setState({ ...state, isStaff: e.target.value })
                  }
                />
                Is Staff?
              </label>
              <label>
                <input type="checkbox" />
                Eign can keep me informed with personalized emails about
                products or services.
              </label>
              <label>
                <input type="checkbox" />I have read and accept the{" "}
                <a href="/"> Terms and Conditions </a> and the{" "}
                <a href="/"> Privacy Policies. </a>
              </label>
            </div>
            {accountCreated ? (
              <div className="success">{accountCreated}</div>
            ) : (
              ""
            )}
            {alreadyExists ? (
              <div className="error-already">{alreadyExists}</div>
            ) : (
              ""
            )}
            <button className="loginbtn">
              {loader ? <Spinner animation="grow" /> : "Create Account"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignupModal;
