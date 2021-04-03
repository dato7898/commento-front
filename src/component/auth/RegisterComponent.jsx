import React from 'react';
import Dropzone from 'react-dropzone'
import AuthenticationService from '../../service/AuthenticationService';
import UploadFileService from '../../service/UploadFileService';

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           name: "Dato",
           email: "davidd7598@gmail.com",
           password: "password",
           imageUrl: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.registerClicked = this.registerClicked.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name] 
                    : event.target.value
            }
        );
    }

    registerClicked() {
        AuthenticationService
            .executeRegister({ 
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                imageUrl: this.state.imageUrl
            })
            .then((response) => {
                this.props.history.push('/login');
            }).catch((error) => {
                console.log(error);
            })
    }

    uploadFile(files) {
        var formData = new FormData();
        formData.append("file", files[0]);
        UploadFileService.uploadFile(formData)
            .then(response => {
                this.setState({ imageUrl: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <div className="container">
                    User Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    Email: <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.registerClicked}>Register</button>
                    <Dropzone onDrop={this.uploadFile}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Загрузить фото</p>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                </div>
            </div>
        )
    }
}

export default RegisterComponent;
