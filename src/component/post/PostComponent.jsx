import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PostDataService from '../../service/PostDataService';
import VoteDataService from '../../service/VoteDataService';

class PostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // а что если больше Int'a?
            businessId: this.props.match.params.businessId,
            boardId: this.props.match.params.boardId,
            postId: this.props.match.params.postId,
            title: '',
            details: '',
            isPrivate: false,
            likes: 0,
            dislikes: 0,
            myvote: undefined
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.getAllVotes = this.getAllVotes.bind(this);
        this.onVoteChange = this.onVoteChange.bind(this);
        this.getMyVote = this.getMyVote.bind(this);
    }

    componentDidMount() {
        // eslint-disable-next-line
        if (this.state.postId === "new") {
            return;
        }

        PostDataService.retrievePost(this.state.businessId, this.state.boardId, this.state.postId)
            .then(response => this.setState({
                details: response.data.details,
                title: response.data.title,
                isPrivate: response.data.isPrivate
            }));

        this.getAllVotes();
        this.getMyVote();
    }

    getAllVotes() {
        VoteDataService.getAllVotes(this.state.postId)
            .then(response => this.setState({
                likes: response.data.true,
                dislikes: response.data.false
            }));
    }

    getMyVote() {
        VoteDataService.getMyVote(this.state.postId)
            .then(response => this.setState({
                myvote: response.data.up
            }));
    }

    onSubmit(values) {
        let post = {
            title: values.title,
            details: values.details,
            isPrivate: values.isPrivate
        };

        if (this.state.postId === "new") {
            PostDataService.createPost(this.state.businessId, this.state.boardId, post)
                .then(() => this.props.history.push(`/business/${this.state.businessId}/board/${this.state.boardId}/post`));
        } else {
            PostDataService.updatePost(this.state.businessId, this.state.boardId, this.state.postId, post)
                .then(() => this.props.history.push(`/business/${this.state.businessId}/board/${this.state.boardId}/post`));
        }
    }

    onVoteChange(up) {
        VoteDataService.changeVote(this.state.postId, { "up": up })
            .then(() => {
                this.getAllVotes();
                this.getMyVote();
            });
    }

    validate(values) {
        let errors = {};
        if (!values.title) {
            errors.title = 'Enter a Title';
        } else if (values.title.length < 5) {
            errors.title = 'Enter atleast 5 Characters in Title';
        }
    
        return errors;
    }

    render() {
        let { title, details, isPrivate } = this.state;

        return (
            <div className="class2">
                <h3>Post</h3>
                <div className="container">
                    <Formik
                        initialValues={{ title, details, isPrivate }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        // https://github.com/formium/formik/issues/811
                        enableReinitialize
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="title" component="div"
                                            className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field className="form-control" type="text" name="title" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Details</label>
                                        <Field className="form-control" type="text" name="details" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Is Private</label>
                                        <Field className="form-control" type="checkbox" name="isPrivate" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                    <div>
                        <button className={"btn" + (this.state.myvote === true ? " btn-primary" : "")} onClick={() => this.onVoteChange(true)}>Like</button>
                        <label>{this.state.likes}</label>
                    </div>
                    <div>
                        <button className={"btn" + (this.state.myvote === false ? " btn-danger" : "")} onClick={() => this.onVoteChange(false)}>Dislike</button>
                        <label>{this.state.dislikes}</label>
                    </div>
                </div>
            </div>
        );
    }

}

export default PostComponent;