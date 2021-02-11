import React, { Component } from 'react';
import ListPostComponent from './ListPostComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CourseComponent from './CourseComponent';
import LoginComponent from './LoginComponent';
import AuthenticatedRoute from './AuthenticatedRoute';

class InstructorApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>MenuComponent</h1>
                    <Switch>
                        <AuthenticatedRoute path="/" exact component={ListPostComponent} />
                        <Route path="/login" exact component={LoginComponent} />
                        <AuthenticatedRoute path="/post" exact component={ListPostComponent} />
                        <AuthenticatedRoute path="/post/:id" exact component={CourseComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default InstructorApp