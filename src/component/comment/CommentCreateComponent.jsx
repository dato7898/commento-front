import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';

class CommentCreateComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: props.message ? props.message : ""
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
                        <Form className="comment-submit-wrapper">
                            <fieldset>
                                <Field 
                                    className="comment-textarea" 
                                    type="textarea" 
                                    name="message" 
                                    placeholder="Leave a comment" 
                                    onKeyUp={this.onCommentType}
                                    rows="1"
                                    as="textarea" 
                                />
                            </fieldset>
                            <button className="reply-button submit-comment-action" type="submit">Отправить</button>
                        </Form>
                    )
                }
            </Formik>
        );
    }

}

export default CommentCreateComponent;