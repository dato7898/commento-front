import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginComponent from './auth/LoginComponent';
import NotAuthenticatedRoute from './route/NotAuthenticatedRoute';
import RegisterComponent from './auth/RegisterComponent';
import MenuComponent from './MenuComponent';
import FooterComponent from './FooterComponent';
import RoadmapComponent from './RoadmapComponent';
import FeedbackComponent from './FeedbackComponent';
import ForgotPasswordComponent from './auth/ForgotPasswordComponent';
import ResetPasswordComponent from './auth/ResetPasswordComponent';
import ResetPasswordRoute from './route/ResetPasswordRoute';
import ErrorPageComponent from './error/ErrorPageComponent';
import BusinessRegisterComponent from './auth/BusinessRegisterComponent';
import BoardListComponent from './board/BoardListComponent';
import BoardEditComponent from './board/BoardEditComponent';
import ListPostComponent from './post/ListPostComponent';
import EditPostComponent from './post/EditPostComponent';
import ViewPostComponent from './post/ViewPostComponent';
import UploadService from '../service/UploadFileService';
import { isUserLoggedIn } from '../service/AuthenticationService';

class CommentoApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
           image: undefined
        };

        this.handleLoadImage = this.handleLoadImage.bind(this);
        this.handleClearImage = this.handleClearImage.bind(this);
    }

    handleLoadImage() {
        if (isUserLoggedIn()) {
            UploadService.loadImage()
                .then(response => {
                    if (response.data && response.data.byteLength) {
                        const base64 = Buffer.from(response.data, 'binary').toString('base64');
                        this.setState({ image: "data:;base64," + base64 });
                    }
                })
                .catch(error => console.log(error));
        }
    }

    handleClearImage() {
        this.setState({ image: undefined });
    }

    render() {
        return (
            <Router>
                <>
                    <MenuComponent 
                        image={this.state.image} 
                        handleClearImage={this.handleClearImage} 
                        handleLoadImage={this.handleLoadImage}
                    />
                    <Switch>
                        {/* Сделать домашнюю страницу
                            <AuthenticatedRoute path="/" exact component={HomePageComponent} /> 
                        */}
                        <NotAuthenticatedRoute 
                            path="/login" 
                            exact 
                            component={() => <LoginComponent handleLoadImage={this.handleLoadImage} />} 
                        />
                        <NotAuthenticatedRoute path="/register" exact component={RegisterComponent} />
                        <NotAuthenticatedRoute path="/forgot_password" exact component={ForgotPasswordComponent} />
                        <ResetPasswordRoute path="/reset_password" exact component={ResetPasswordComponent} />
                        <Route path="/error" exact component={ErrorPageComponent} />
                        <NotAuthenticatedRoute path="/register_business" exact component={BusinessRegisterComponent} />
                        <Route path={`/business/:businessId/board`} exact component={BoardListComponent} />
                        <Route path={`/business/:businessId/board/:boardId/edit`} exact component={BoardEditComponent} />
                        <Route path={`/business/:businessId/board/:boardId/post`} exact component={ListPostComponent} />
                        <Route path={`/business/:businessId/board/:boardId/post/:postId/edit`} exact component={EditPostComponent} />
                        <Route path={`/business/:businessId/board/:boardId/post/:postId`} exact component={ViewPostComponent} />
                        <Route path={`/roadmap`} exact component={RoadmapComponent} />
                        <Route path={`/feedback`} exact component={FeedbackComponent} />
                    </Switch>
                    <FooterComponent />
                </>
            </Router>
        );
    }
}

export default CommentoApp;