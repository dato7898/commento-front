import React, { Component } from 'react'
import ForgotPasswordService from '../service/ForgotPasswordService';

class ForgotPasswordComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: 'lchlhe787898@gmail.com',
            notif: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.sendClicked = this.sendClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name] 
                    : event.target.value
            }
        )
    }

    sendClicked() {
        ForgotPasswordService
            .sendEmail(this.state.email)
            .then((response) => {
                this.setState({ notif: 'Send Succesfull' });
            })
            .catch(error => {
                this.setState({ notif: error.response.data.message });
            });
    }

    render() {
        return (
            <div>
                <h1>Forgot Password</h1>
                <div className="container">
                    {this.state.notif && <div>{this.state.notif}</div>}
                    User Email: <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.sendClicked}>Send</button>
                </div>
            </div>
        )
    }
}

export default ForgotPasswordComponent;