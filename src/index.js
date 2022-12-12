// import React from 'react';
// import ReactDOM from "react-dom/client";

// import "antd/dist/antd.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles/global.css";

// import App from './components/App';

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//     <App />
// )

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import './i18n.js'
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import App from './components/App';

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback="...loading">
     <App />
    </Suspense>
  </React.Fragment>,
  document.getElementById("root")
);