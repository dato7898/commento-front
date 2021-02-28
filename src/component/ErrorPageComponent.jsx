import React, { Component } from 'react'

class ErrorPageComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            errorMessage: 'Something went wrong'
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>{this.state.errorMessage}</h1>
                </div>
            </div>
        )
    }
}

export default ErrorPageComponent;