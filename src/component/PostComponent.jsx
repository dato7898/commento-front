import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PostDataService from '../service/PostDataService';

class PostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // а что если больше Int'a?
            id: parseInt(this.props.match.params.id),
            title: '',
            details: '',
            isPrivate: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);

    }

    componentDidMount() {

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return;
        }

        PostDataService.retrievePost(this.state.id)
            .then(response => this.setState({
                details: response.data.details,
                title: response.data.title,
                isPrivate: response.data.isPrivate
            }));
    }

    onSubmit(values) {

        let post = {
            id: this.state.id,
            title: values.title,
            details: values.details,
            isPrivate: values.isPrivate
        };

        if (this.state.id === -1) {
            PostDataService.createPost(post)
                .then(() => this.props.history.push('/post'));
        } else {
            PostDataService.updatePost(this.state.id, post)
                .then(() => this.props.history.push('/post'));
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

    render() {
        let { title, details, isPrivate } = this.state;

        return (
            <div>
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
                </div>
            </div>
        );
    }

}

export default PostComponent;