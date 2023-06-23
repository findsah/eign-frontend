import React from 'react'
import markIcon from '../../../assets/icons/markIcon.png'
import gainsideimg from '../../../assets/images/gainsideimg.png'
export default function EiginToGain() {
  return (
    <div className="bg-gain">
    <div className="container">
      <div className="row">
        <div className="col-lg-7 col-md-7 col-sm-6 col-12">
          <div className="gain">
            <h4>Eign to Gain</h4>
            <h6>
              Emerging Technologies Replacing the Middle-Man and Saving You
              Thousands of Dollars
            </h6>
            <p>
              <img src={markIcon} alt="check" />
              <span>
                Big Data allows informed real estate decisions with greater
                accuracy AI and ML to match buyers and sellers and suggest
                best homes for your taste
              </span>
            </p>
            <p>
              <img src={markIcon} alt="check" />
              <span>
                Virtual Reality to view your dream home wherever you are in
                the world
              </span>
            </p>
            <button>Learn more</button>
          </div>
        </div>
        <div className="center col-lg-4 col-md-5 col-sm-6 col-12">
          <img
            src={gainsideimg}
            alt="gain"
            className="gain-image"
          />
        </div>
      </div>
    </div>
  </div>
  )
}
