import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

class ResetPasswordRoute extends Component {
    render() {
        if (Cookies.get(window.RESET_PASSWORD_CODE)) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/error" />
        }
    }
}

export default ResetPasswordRoute