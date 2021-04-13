import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PostDataService from '../../service/PostDataService';
import VoteDataService from '../../service/VoteDataService';

class EditPostComponent extends Component {

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
            foundPosts: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
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

    validate(values) {
        let errors = {};
        if (!values.title) {
            errors.title = 'Enter a Title';
        } else if (values.title.length < 5) {
            errors.title = 'Enter atleast 5 Characters in Title';
        }
    
        return errors;
    }

    onTitleChange(e) {
        const title = e.target.value;
        PostDataService.postExist(this.state.businessId, this.state.boardId, title)
            .then(response => {
                response.data === true 
                    ? this.setState({ titleError: 'post with title already exist' }) 
                    : this.setState({ titleError: undefined });
            })
        
        PostDataService.searchPosts(this.state.businessId, this.state.boardId, title)
            .then(response => {
                this.setState({ foundPosts: response.data });
            })
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
                                        <label>Title {this.state.titleError && this.state.titleError}</label>
                                        <Field 
                                            className="form-control" 
                                            type="text" 
                                            name="title" 
                                            onKeyUp={this.onTitleChange}
                                        />
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
                    {this.state.foundPosts.map((post, i) => (<div key={i}>{post.title}<br />{post.details}</div>))}
                </div>
            </div>
        );
    }

}

export default EditPostComponent;