import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';


axios.interceptors.request.use(
  (req) => {
      const accessToken = localStorage.getItem("token");
      req.headers.Authorization = accessToken;
      return req;
  },
  (err) => {
      return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
      return res;
  },
  (err) => {
      if (err.response) {
          if (err.response.status === 403) {
              localStorage.removeItem('token');
              window.location = '/';
          }
      }
      return Promise.reject(err);
  }
);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


