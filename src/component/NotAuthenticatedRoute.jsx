import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserLoggedIn } from '../service/AuthenticationService';

class NotAuthenticatedRoute extends Component {
    render() {
        if (!isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/" />
        }
    }
}

export default NotAuthenticatedRoute