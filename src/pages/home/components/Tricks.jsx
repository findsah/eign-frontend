import React from "react";
import HomeLoan1 from '../../../assets/images/HomeLoan1.png'
import homeloan2 from '../../../assets/images/homeloan2.png'
import homeloan3 from '../../../assets/images/homeloan3.png'
export default function Tricks() {
  return (
    <div className="mt-5 container">
      <div className="settingmargin row">
        <div className="m-0 col-lg-6 col-md-12 col-sm-12 col-12">
          <h3>Knowing the tricks can make the deal more attractive</h3>
        </div>
        <div className="m-0 col-lg-6 col-md-12 col-sm-12 col-12"></div>
        <div className="col-4">
          <div>
            <img src={HomeLoan1} alt="house1" />
            <p>
              <span className="dot"></span>Home Loan
            </p>
            <div className="p-0 col-lg-9 col-md-9 col-sm-9 col-9">
              <h4>Anyone can hold the helm when the sea is calm</h4>
            </div>
            <a href="/">Read More</a>
          </div>
        </div>
        <div className="col-4">
          <div>
            <img
              src={homeloan2}
              alt="house2"
            />
            <p>
              <span className="dot"></span>Car Loan
            </p>
            <div className="p-0 col-lg-9 col-md-9 col-sm-9 col-9">
              <h4>Anyone can hold the helm when the sea is calm</h4>
            </div>
            <a href="/">Read More</a>
          </div>
        </div>
        <div className="col-4">
          <div>
            <img src={homeloan3} alt="house3" />
            <p>
              <span className="dot"></span>Home Loan
            </p>
            <div className="p-0 col-lg-9 col-md-9 col-sm-9 col-9">
              <h4>Anyone can hold the helm when the sea is calm</h4>
            </div>
            <a href="/">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
}
