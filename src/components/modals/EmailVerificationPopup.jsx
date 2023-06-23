import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { verify } from "./service/authApi";
import { Modal, Spinner } from 'react-bootstrap';
import { toast } from "react-toastify";

function EmailVerificationPopup({show, onHide}) {

      // const [otp,setOtp] = useState('');
  const dispatch = useDispatch()

  const email = sessionStorage.getItem('email')
  const otp = sessionStorage.getItem('otp')

  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(verify({ email, otp }))
    .then((response) => {
        // Handle the successful response here
        console.log('response',response);
        if (response.payload.msg) {
          onHide(false)
          toast.success('you are login now')
          sessionStorage.removeItem('email')
        } else{
          toast.error('Invalid OTP or Email')
        } 
      })
      .catch((error) => {
        // Handle the error here
        console.error('error',error);
      });

  };

  return (
    <div className="popup">
        <Modal centered show={show} onHide={onHide} className='login-modal'>
      <Modal.Body>
 
        <p>Enter 4-digit code</p>
        {/* <p>{email}</p> */}
        <form onSubmit={handleSubmit}>

        <div className="maildiv">
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="mailbox"
            />
            <i className="fa fa-envelope-square loginmail" />
          </div>
          <div className="paswdiv">
            <input
              value={otp}
              className="paswbox"
              placeholder="Enter 4-digit code"
              type="text"
              maxLength={4}
              // onChange={(e) => setOtp(e.target.value) }
            //   onChange={(e) =>
            //     setState({...state,otp: e.target.value})
            // }

            />
            <i className="fa fa-lock loginpassword" />
          </div>
        
          <button className="loginbtn" type="submit">
          Verify
          </button>
          </form>
      </Modal.Body>
    </Modal>
      {/* <form onSubmit={handleSubmit}>
        <h2>Enter Verification Code</h2>
        <p>A verification code has been sent to your email address.</p>
        <input
          type="text"
          placeholder="Enter 4-digit code"
          value={otp}
          onChange={handleChange}
          maxLength="4"
          required
        />
        <button type="submit">Verify</button>
      </form> */}
    </div>
  );
}

export default EmailVerificationPopup;
