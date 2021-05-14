import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';

class CommentCreateComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ""
        };

        this.onCommentType = this.onCommentType.bind(this);
    }

    onCommentType(e) {
        e.target.style.height = "5px";
        e.target.style.height = (e.target.scrollHeight)+"px";
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
                                <Field 
                                    className="comment-textarea" 
                                    type="textarea" 
                                    name="message" 
                                    placeholder="Leave a comment" 
                                    onKeyUp={this.onCommentType}
                                    rows="1"
                                    as="textarea" />
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