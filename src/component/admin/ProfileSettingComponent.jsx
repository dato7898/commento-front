import React, { Component } from 'react';
import UploadService from '../../service/UploadFileService';
import UserDataService from '../../service/UserDataService';
import Dropzone from 'react-dropzone'
import AuthenticationService from '../../service/AuthenticationService';

class ProfileSettingComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Amir',
            email: '666amir777@mail.ru'
        }

        this.handleLoadImage = this.handleLoadImage.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.handleSaveUser = this.handleSaveUser.bind(this);
    }

    componentDidMount() {
        this.handleLoadImage();
    }

    handleLoadImage() {
        UploadService.loadImage()
            .then(response => {
                const base64 = UploadService.convertToBase64(response.data);
                if (base64) {
                    this.setState({ image: "data:;base64," + base64 });
                }
            })
            .catch(error => console.log(error));
    }

    onNameChange(event) {
        this.setState({ name: event.target.value });
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleSaveUser() {
        UserDataService
            .updateUser({ 
                name: this.state.name,
                email: this.state.email,
                imageUrl: this.state.imageUrl
            })
            .then((response) => {
                AuthenticationService.loginSuccessful(response.data);
                window.location.pathname = '/admin';
            }).catch((error) => {
                console.log(error);
            })
    }

    uploadFile(files) {
        var formData = new FormData();
        formData.append("file", files[0]);
        UploadService.uploadFile(formData)
            .then(response => {
                this.setState({ imageUrl: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="profile-wrap">
                <div className="profile-head">
                    Account & Profile
                </div>
                <hr />
                <div className="image-setting">
                    {this.state.image &&
                        <img className="prof-pic" src={this.state.image} alt="profile picture" width="50" height="50" />
                    }
                    <Dropzone className="upload-img-btn" onDrop={this.uploadFile}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="upload-img-btn">Upload image</p>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                </div>
                <div className="form-wrap">
                    <div className="input-wrap">
                        <span>Name</span><br />
                        <input value="Amir" onChange={this.onNameChange} />
                    </div>
                    <div className="input-wrap">
                        <span>Email</span><br />
                        <input value="666amir777@mail.ru" onChange={this.onEmailChange} />
                    </div>
                    <div className="save-btn" onClick={this.handleSaveUser}>
                        Save
                    </div>
                </div>
            </div>
        );
    }

}

export default ProfileSettingComponent;
