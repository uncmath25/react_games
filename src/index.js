import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/_third_party/bootstrap-5.3.3.css';
import Router from './js/Router';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
