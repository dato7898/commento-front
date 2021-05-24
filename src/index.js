import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cookies from 'js-cookie';
import axios from 'axios';
import { createJWTToken, setupAxiosHeader } from './service/AuthenticationService';


window.API_URL = "http://193.123.71.211:8080";
window.APP_URL = "http://193.123.71.211:3000";
//window.API_URL = "http://localhost:8080";
//window.APP_URL = "http://localhost:3000";
window.TOKEN_HEADER = 'authenticatedUserToken';
window.REFRESH_TOKEN_HEADER = 'authenticatedUserRefreshToken';
window.RESET_PASSWORD_CODE = 'resetPasswordCode';
window.USER_ID = "userId";

// проверить что отдаёт createJWTToken
setupAxiosHeader(createJWTToken(Cookies.get(window.TOKEN_HEADER)));

axios.interceptors.response.use(
  (response) => {
      return response;
  },
  (error) => {
      if (error.response && error.response.data.code === 401) {
        Cookies.remove(window.REFRESH_TOKEN_HEADER);
        Cookies.remove(window.TOKEN_HEADER);
        Cookies.remove(window.USER_ID);
      }
      const originalRequest = error.config;
      let refreshToken = Cookies.get(window.REFRESH_TOKEN_HEADER);
      // Only Unauthorized error code was processed
      if (refreshToken &&
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
      ) {
          originalRequest._retry = true;
          return axios
              .post(`${window.API_URL}/refresh`, {},
                  { headers: { 'refreshToken': createJWTToken(refreshToken) } })
              .then((res) => {
                  if (res.status === 200) {
                      // почему-то достаточно обновить токен в header оригинального запроса
                      // и он обновляется также в axios header
                      originalRequest.headers.authorization = createJWTToken(res.data.jwt);
                      Cookies.set(window.TOKEN_HEADER, res.data.jwt, { expires: 7 });
                      Cookies.set(window.REFRESH_TOKEN_HEADER, res.data.jwtRefresh, { expires: 7 });
                      Cookies.set(window.USER_ID, res.data.userId, { expires: 7 });
                      return axios(originalRequest);
                  }
              })
              .catch((error) => {
                // Этот код никогда не сработает?
                if (/*error.response.status !== 401*/ window.location.href !== window.APP_URL + "/login")
                  document.location.href = window.APP_URL + '/login';
              });
      } 
      return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
