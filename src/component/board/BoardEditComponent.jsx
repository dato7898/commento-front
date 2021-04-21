import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import BoardDataService from '../../service/BoardDataService';

class BoardEditComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            businessId: this.props.match.params.businessId,
            boardId: this.props.match.params.boardId,
            name: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        // eslint-disable-next-line
        if (this.state.boardId === "new") {
            return;
        }

        BoardDataService.retrieveBoard(this.state.businessId, this.state.boardId)
            .then(response => this.setState({
                name: response.data.name
            }));
    }

    onSubmit(values) {
        let board = {
            name: values.name
        };

        if (this.state.boardId === "new") {
            BoardDataService.createBoard(this.state.businessId, board)
                .then(() => this.props.history.push(`/business/${this.state.businessId}/board`));
        } else {
            BoardDataService.updateBoard(this.state.businessId, this.state.boardId, board)
                .then(() => this.props.history.push(`/business/${this.state.businessId}/board`));
        }
    }

    validate(values) {
        let errors = {};
        if (!values.name) {
            errors.name = 'Enter a Name';
        } else if (values.name.length < 5) {
            errors.name = 'Enter atleast 5 Characters in Name';
        }
    
        return errors;
    }

    render() {
        let { name } = this.state;

        return (
            <div className="class2">
                <h3>Post</h3>
                <div className="container">
                    <Formik
                        initialValues={{ name }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="name" component="div"
                                            className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <Field 
                                            className="form-control" 
                                            type="text" 
                                            name="name"
                                        />
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

export default BoardEditComponent;