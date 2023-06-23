import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

import 'ion-rangeslider/js/ion.rangeSlider.js';
import 'ion-rangeslider/js/ion.rangeSlider.min.js';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';
// slick css
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// custom css
import "./index.scss";


// store
import { Provider } from "react-redux";
import store from "./services/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Suspense fallback={loadingMarkup}>
  <React.StrictMode>
    <BrowserRouter>
      <Provider {...{ store }}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ToastContainer position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            transition={Slide}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
</Suspense>
);
