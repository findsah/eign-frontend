import React from "react";
import homenextdor from "../../../assets/icons/homenextdor.png";
import saleimg from "../../../assets/images/saleimg.png";
export default function SellMore() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-md-5 col-sm-5 col-10">
          <div className="sellimg">
            <img src={saleimg} alt="calc" />
          </div>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-1 col-2"></div>
        <div className="col-lg-5 col-md-6 col-sm-6 col-12">
          <div className="sellmore">
            <div className="calc">
              <img src={homenextdor} alt="calc" />
            </div>
            <div className="p-0 col-lg-9 col-md-12 col-sm-12 col-12">
              <h3>Sell for more than the home next door</h3>
              <p>
                Request a free, no-obligation consultation with a local Habrick
                Agent.
              </p>
            </div>
            <div className="evaluate">
              <input id="eval" type="text" />
              <button>Evaluate</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-1 col-md-12 col-sm-12 col-12"></div>
    </div>
  );
}
