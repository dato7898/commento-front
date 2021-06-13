import React, { Component } from 'react'
import AuthenticationService from '../../service/AuthenticationService';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'David',
            password: 'qwerty',
            hasLoginFailed: false,
            businessName: window.location.host.split('.')[0]
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name] 
                    : event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                // TODO Возвращать помимо токена юзера самого юзера и кидать на его бизнес страничку.
                // Если нет, на страничку регистрации бизнес аккаунта.
                // Это если он был на страничке логина, а если на странице другого бизнеса,
                // то запрашивать логин в popup меню и оставлять на той же странице.
                AuthenticationService.loginSuccessful(response.data);
                this.props.handleLoadImage();
                window.location.href = "/";
            }).catch(() => {
                this.setState({ hasLoginFailed: true });
            })
    }

    render() {
        return (
            <div className="register-window">
                <div className="container d-flex justify-content-center flex-column login-container">
                    <h1>Login</h1>
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invald Credentials</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                    <p><a href={`http://${this.state.businessName}.${window.APP_URL}/forgot_password`}>Forgot your password?</a></p>
                    <div className="soc-net-wrap">
                        <a href={window.API_URL + "/oauth2/authorization/google"}><img src="/icons/soc-net/iconfinder_2993685_brand_brands_google_logo_logos_icon.svg" alt="google" /></a>
                        <a href={window.API_URL + "/oauth2/authorization/github"}><img src="/icons/soc-net/iconfinder_394187_github_icon.svg" alt="github" /></a>
                        <a href={window.API_URL + "/oauth2/authorization/facebook"}><img src="/icons/soc-net/iconfinder_5296499_fb_facebook_facebook logo_icon.svg" alt="facebook" /></a>
                        <a href={window.API_URL + "/oauth2/authorization/instagram"}><img src="/icons/soc-net/iconfinder_5296765_camera_instagram_instagram logo_icon.svg" alt="instagram" /></a>
                        <a href={window.API_URL + "/oauth2/authorization/yandex"}><img src="/icons/soc-net/iconfinder_4375137_logo_yandex_icon.svg" alt="yandex" /></a>
                        <a href={window.API_URL + "/oauth2/authorization/vkontakte"}><img src="/icons/soc-net/iconfinder_4362954_vk_vkontakte_logo_social media_icon.svg" alt="vkontakte" /></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent