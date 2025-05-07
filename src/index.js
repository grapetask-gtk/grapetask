import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
<<<<<<< HEAD
import { HelmetProvider } from "react-helmet-async";
=======
>>>>>>> d918fe2 (cahnges by abdul qavi)
// import { store, persistor  } from './redux/store/store';
// import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
<<<<<<< HEAD
        <HelmetProvider>
          <App />
        {/* </PersistGate> */}
        </HelmetProvider>
=======

          <App />
        {/* </PersistGate> */}

>>>>>>> d918fe2 (cahnges by abdul qavi)
      </Provider>

    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
<<<<<<< HEAD
// import React from "react";
// import ReactDOM from "react-dom";
// import { HelmetProvider } from "react-helmet-async";
// import App from "./App";

// ReactDOM.render(
//   <HelmetProvider>
//     <App />
//   </HelmetProvider>,
//   document.getElementById("root")
// );
=======
>>>>>>> d918fe2 (cahnges by abdul qavi)
