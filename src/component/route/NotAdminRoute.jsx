import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isBusinessOwner } from '../../service/AuthenticationService';

class NotAdminRoute extends Component {
    render() {
        if (isBusinessOwner()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/" />
        }
    }
}

export default NotAdminRoute