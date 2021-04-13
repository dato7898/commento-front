import React, { Component } from 'react'
import AuthenticationService from '../../service/AuthenticationService';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'David',
            password: 'qwerty',
            hasLoginFailed: false,
            showSuccessMessage: false
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
                this.props.history.push('/');
            }).catch(() => {
                this.setState({ showSuccessMessage: false });
                this.setState({ hasLoginFailed: true });
            })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invald Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    <div>
                        <h4><a href={window.API_URL + "/oauth2/authorization/google"}>Login with Google</a></h4>
                        <h4><a href={window.API_URL + "/oauth2/authorization/github"}>Login with GitHub</a></h4>
                        <h4><a href={window.API_URL + "/oauth2/authorization/facebook"}>Login with Facebook</a></h4>
                        <h4><a href={window.API_URL + "/oauth2/authorization/instagram"}>Login with Instagram</a></h4>
                        <h4><a href={window.API_URL + "/oauth2/authorization/yandex"}>Login with Yandex</a></h4>
                        <h4><a href={window.API_URL + "/oauth2/authorization/vkontakte"}>Login with Vkontakte</a></h4>
                    </div>
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                    <p><a href={window.APP_URL + "/forgot_password"}>Forgot your password?</a></p>
                </div>
            </div>
        )
    }
}

export default LoginComponent