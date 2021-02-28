import React, { Component } from 'react'
import ForgotPasswordService from '../service/ForgotPasswordService';
import Cookies from 'js-cookie';

class ResetPasswordComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            password: 'password'
        }

        this.handleChange = this.handleChange.bind(this)
        this.resetClicked = this.resetClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name] 
                    : event.target.value
            }
        )
    }

    resetClicked() {
        ForgotPasswordService.resetPassword(this.state.password)
            .then(() => {
                this.props.history.push('/')
            });
    }

    render() {
        return (
            <div>
                <h1>Reset Your Password</h1>
                <div className="container">
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.resetClicked}>Change Password</button>
                </div>
            </div>
        )
    }
}

export default ResetPasswordComponent;