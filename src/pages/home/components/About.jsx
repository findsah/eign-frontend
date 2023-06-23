import React from "react";
import aboutbiliding from '../../../assets/images/aboutbiliding.png'
import loan from '../../../assets/icons/loan.png'
export default function About() {
  return (
    <div className="bg-loan">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-5 col-11">
            <div className="loan-image">
              <img
                src={aboutbiliding}
                alt="loan"
              />
            </div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-1 col-1"></div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="loan">
              <img src={loan} alt="loanIcon" />
              <h4>Do It Yourself the easy way</h4>
              <p>
                You can gain competitive advantage with minimal fees of 0.5%
                while getting better services and more accurate data.
              </p>
              <button>About us</button>
            </div>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-1 col-1"></div>
        </div>
      </div>
    </div>
  );
}
