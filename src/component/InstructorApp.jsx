import React, { Component } from 'react';
import ListPostComponent from './ListPostComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CourseComponent from './CourseComponent';
import LoginComponent from './LoginComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';
import RegisterComponent from './RegisterComponent';
import MenuComponent from './MenuComponent';
import ForgotPasswordComponent from './ForgotPasswordComponent';
import ResetPasswordComponent from './ResetPasswordComponent';
import ResetPasswordRoute from './ResetPasswordRoute';
import ErrorPageComponent from './ErrorPageComponent';
import BusinessRegisterComponent from './BusinessRegisterComponent';

class InstructorApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <MenuComponent />
                    <Switch>
                        <AuthenticatedRoute path="/" exact component={ListPostComponent} />
                        <NotAuthenticatedRoute path="/login" exact component={LoginComponent} />
                        <NotAuthenticatedRoute path="/register" exact component={RegisterComponent} />
                        <NotAuthenticatedRoute path="/forgot_password" exact component={ForgotPasswordComponent} />
                        <AuthenticatedRoute path="/post" exact component={ListPostComponent} />
                        <AuthenticatedRoute path="/post/:id" exact component={CourseComponent} />
                        <ResetPasswordRoute path="/reset_password" exact component={ResetPasswordComponent} />
                        <Route path="/error" exact component={ErrorPageComponent} />
                        <NotAuthenticatedRoute path="/register_business" exact component={BusinessRegisterComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default InstructorApp