import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';

class CommentCreateComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ""
        };
    }

    render() {
        let { message } = this.state;

        return (
            <Formik
                initialValues={{ message }}
                onSubmit={this.props.onCommentSubmit}
                enableReinitialize
            >
                {
                    (props) => (
                        <Form>
                            <fieldset className="form-group">
                                <label>Message</label>
                                <Field className="form-control" type="text" name="message" />
                            </fieldset>
                            <button className="btn btn-success" type="submit">Send</button>
                        </Form>
                    )
                }
            </Formik>
        );
    }

}

export default CommentCreateComponent;