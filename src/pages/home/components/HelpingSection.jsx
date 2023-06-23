import React from 'react'
import buyhome from "../../../assets/icons/buyhome.png";
import sellhome from "../../../assets/icons/sellhome.png";
import renthome from "../../../assets/icons/renthome.png";
import { Link } from 'react-router-dom';
export default function HelpingSection() {
  return (
    <div className='container'>
         <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <div className="union">
            <img src={buyhome} alt="emptyhouse" />
            <h3>Buy your home</h3>
            <p>
              Save up to 5.5% and put those thousands of dollars in your pocket!
              Be in charge of a comprehensive, start-to-finish online selling
              process.
            </p>
            <Link to='search'>
            <button>Search Now</button>
            </Link>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <div className="union blue">
            <img src={sellhome} alt="emptyhouse" />
            <h3>Sell your home</h3>
            <p>
              Save up to 5.5% and put those thousands of dollars in your pocket!
              Be in charge of a comprehensive, start-to-finish online selling
              process.
            </p>
            {/* <button>Search Now</button> */}
            <Link to='sell'><button>Sell Home</button></Link>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <div className="union">
            <img src={renthome} alt="rent" />
            <h3>Rent a home</h3>
            <p>
              Experience renting a property backed by vast amount of data about
              your future neighbourhood. View the properties in virtual reality
            </p>
             <Link to='search'>
            <button>Search Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
