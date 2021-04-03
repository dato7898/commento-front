import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * When user login is successful, we can set up an axios header 
 * to added an authorization header on every subsequent API call. 
 */
class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${window.API_URL}/authenticate`, {
            username,
            password
        });
    }

    executeRegister(user) {
        return axios.post(`${window.API_URL}/register`, user);
    }

    executeBusinessRegister(user) {
        return axios.post(`${window.API_URL}/register_business`, user);
    }

    loginSuccessful(token, refreshToken) {
        Cookies.set(window.TOKEN_HEADER, token, { expires: 7 });
        Cookies.set(window.REFRESH_TOKEN_HEADER, refreshToken, { expires: 7 })
        setupAxiosHeader(createJWTToken(token));
    }

    sendPhoneVerify(to) {
        return axios.post(`${window.API_URL}/phone_verify`, to);
    }
}

export default new AuthenticationService();

/**
 * Add prefix to token
 * @param {JwtToken} token 
 */
export const createJWTToken = (token) => 'Bearer ' + token;

export const isUserLoggedIn = () => Cookies.get(window.TOKEN_HEADER);

export const setupAxiosHeader = (token) => {
    if (isUserLoggedIn()) {
        axios.defaults.headers.common['authorization'] = token;
    }
}

export const logout = () => {
    Cookies.remove(window.TOKEN_HEADER);
    Cookies.remove(window.REFRESH_TOKEN_HEADER);
    axios.defaults.headers.common['authorization'] = undefined;
};
