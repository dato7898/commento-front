import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PostDataService from '../service/PostDataService';

class PostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);

    }

    componentDidMount() {

        console.log(this.state.id);

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return;
        }

        PostDataService.retrievePost(this.state.id)
            .then(response => this.setState({
                description: response.data.description
            }));
    }

    onSubmit(values) {

        let post = {
            id: this.state.id,
            title: values.title,
            description: values.description
        }

        if (this.state.id === -1) {
            PostDataService.createCourse(post)
                .then(() => this.props.history.push('/post'))
        } else {
            PostDataService.updateCourse(this.state.id, post)
                .then(() => this.props.history.push('/post'))
        }

        console.log(values);
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }
    
        return errors
    }

    render() {
        let { description, id } = this.state

        return (
            <div>
            <h3>Post</h3>
            <div className="container">
                <Formik
                    initialValues={{ id, description }}
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
                                <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Id</label>
                                    <Field className="form-control" type="text" name="id" disabled />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
        )
  }

}

export default PostComponent;