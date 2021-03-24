import React from 'react';
import AuthenticationService from '../../service/AuthenticationService';

class BusinessRegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           name: "Dato",
           phone: "+77788569620",
           code: "",
           password: "password"
        };

        this.handleChange = this.handleChange.bind(this);
        this.registerBusinessClicked = this.registerBusinessClicked.bind(this);
        this.sendVerify = this.sendVerify.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name] 
                    : event.target.value
            }
        );
    }

    registerBusinessClicked() {
        AuthenticationService
            .executeBusinessRegister({ 
                name: this.state.name,
                phone: this.state.phone,
                phoneVerificationCode: this.state.code,
                password: this.state.password 
            })
            .then(() => {
                this.props.history.push('/login');
            }).catch((error) => {
                console.log(error);
            })
    }

    sendVerify() {
        AuthenticationService.sendPhoneVerify({
            to: this.state.phone
        })
        .then(() => {
            console.log('verify send');
        })
        .catch(() => {
            console.log('verify error');
        })
    }
 
    render() {
        return (
            <div>
                <h1>Register</h1>
                <div className="container">
                    User Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    Phone Number: <input type="tel" name="phone" value={this.state.phone} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.sendVerify}>Verify</button>
                    Code: <input type="text" name="code" value={this.state.code} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.registerBusinessClicked}>Register</button>
                </div>
            </div>
        )
    }
}

export default BusinessRegisterComponent;
