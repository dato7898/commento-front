import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';
import RegisterComponent from './RegisterComponent';
import MenuComponent from './MenuComponent';
import ForgotPasswordComponent from './ForgotPasswordComponent';
import ResetPasswordComponent from './ResetPasswordComponent';
import ResetPasswordRoute from './ResetPasswordRoute';
import ErrorPageComponent from './ErrorPageComponent';
import BusinessRegisterComponent from './BusinessRegisterComponent';
import ListPostComponent from './ListPostComponent';
import PostComponent from './PostComponent';

class CommentoApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <MenuComponent />
                    <Switch>
                        {/* Сделать домашнюю страницу
                            <AuthenticatedRoute path="/" exact component={ListPostComponent} /> 
                        */}
                        <NotAuthenticatedRoute path="/login" exact component={LoginComponent} />
                        <NotAuthenticatedRoute path="/register" exact component={RegisterComponent} />
                        <NotAuthenticatedRoute path="/forgot_password" exact component={ForgotPasswordComponent} />
                        <ResetPasswordRoute path="/reset_password" exact component={ResetPasswordComponent} />
                        <Route path="/error" exact component={ErrorPageComponent} />
                        <NotAuthenticatedRoute path="/register_business" exact component={BusinessRegisterComponent} />
                        <Route path={`/business/:businessName/post`} exact component={ListPostComponent} />,
                        <Route path={`/business/:businessName/post/:postId`} exact component={PostComponent} />,
                    </Switch>
                </>
            </Router>
        );
    }
}

export default CommentoApp;