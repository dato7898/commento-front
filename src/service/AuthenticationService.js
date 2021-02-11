import axios from 'axios'

const API_URL = "http://localhost:8080"

export const TOKEN_HEADER = 'authenticatedUserToken'
export const REFRESH_TOKEN_HEADER = 'authenticatedUserRefreshToken'

/**
 * When user login is successful, we can set up an axios header 
 * to added an authorization header on every subsequent API call. 
 */

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } }
        );
    }

    executeJwtAuthenticationService(username, password) {
        console.log(username);
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    /**
     * Create basic authentication token
     * @param {user credentials} username 
     * @param {user credentials} password 
     */
    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        let token = this.createBasicAuthToken(username, password);
        localStorage.setItem(TOKEN_HEADER, username)
        this.setupAxiosInterceptors(token)
    }

    registerSuccessfulLoginForJwt(token, refreshToken) {
        localStorage.setItem(TOKEN_HEADER, token)
        localStorage.setItem(REFRESH_TOKEN_HEADER, refreshToken)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }
    
    createJWTToken(token) {
        return 'Bearer ' + token
    }

    /**
     * sets up the axios interceptor to add the authorization token on every subsequent REST API call
     * @param {token from API} token 
     */
    setupAxiosInterceptors(token) {
        if (this.isUserLoggedIn()) {
            axios.defaults.headers.common['authorization'] = token
        }

        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const originalRequest = error.config;
                let refreshToken = localStorage.getItem(REFRESH_TOKEN_HEADER);
                if (// не работает. должен принимать ошибку из JwtAuthenticationEntryPoint
                    //error.response.status === 401 &&
                    !originalRequest._retry
                ) {
                    originalRequest._retry = true;
                    return axios
                        .post(`${API_URL}/refresh`, {},
                            { headers: { 'refreshToken': this.createJWTToken(refreshToken) } })
                        .then((res) => {
                            if (res.status === 200) {
                                originalRequest.headers.authorization = this.createJWTToken(res.data.jwt);
                                localStorage.setItem(TOKEN_HEADER, res.data.jwt);
                                localStorage.setItem(REFRESH_TOKEN_HEADER, res.data.jwtRefresh)
                                return axios(originalRequest);
                            }
                        });
                } 
                return Promise.reject(error);
            }
        )
    }

    isUserLoggedIn() {
        let user_token = localStorage.getItem(TOKEN_HEADER)
        if (user_token === null) return ''
        return user_token
    }
}

export default new AuthenticationService()