import React from 'react';
import AuthenticationService from '../../service/AuthenticationService';

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           name: "Dato",
           email: "davidd7598@gmail.com",
           password: "password"
        };

        this.handleChange = this.handleChange.bind(this);
        this.registerClicked = this.registerClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name] 
                    : event.target.value
            }
        );
    }

    registerClicked() {
        AuthenticationService
            .executeRegister({ 
                name: this.state.name,
                email: this.state.email,
                password: this.state.password 
            })
            .then((response) => {
                this.props.history.push('/login');
            }).catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <div className="container">
                    User Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    Email: <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.registerClicked}>Register</button>
                </div>
            </div>
        )
    }
}

export default RegisterComponent;
