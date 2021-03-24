import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginComponent from './auth/LoginComponent';
import NotAuthenticatedRoute from './route/NotAuthenticatedRoute';
import RegisterComponent from './auth/RegisterComponent';
import MenuComponent from './MenuComponent';
import ForgotPasswordComponent from './auth/ForgotPasswordComponent';
import ResetPasswordComponent from './auth/ResetPasswordComponent';
import ResetPasswordRoute from './route/ResetPasswordRoute';
import ErrorPageComponent from './error/ErrorPageComponent';
import BusinessRegisterComponent from './auth/BusinessRegisterComponent';
import BoardListComponent from './board/BoardListComponent';
import ListPostComponent from './post/ListPostComponent';
import PostComponent from './post/PostComponent';

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
                        <Route path={`/business/:businessId/board`} exact component={BoardListComponent} />
                        <Route path={`/business/:businessId/board/:boardId/post`} exact component={ListPostComponent} />
                        <Route path={`/business/:businessId/board/:boardId/post/:postId`} exact component={PostComponent} />
                    </Switch>
                </>
            </Router>
        );
    }
}

export default CommentoApp;