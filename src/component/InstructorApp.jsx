import React, { Component } from 'react';
import ListPostComponent from './ListPostComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CourseComponent from './CourseComponent';
import LoginComponent from './LoginComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';
import RegisterComponent from './RegisterComponent';
import MenuComponent from './MenuComponent';

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
                        <AuthenticatedRoute path="/post" exact component={ListPostComponent} />
                        <AuthenticatedRoute path="/post/:id" exact component={CourseComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default InstructorApp