import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import UploadService from '../../service/UploadFileService';
import BusinessDataService from '../../service/BusinessDataService';

class CompanySettingComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'robtics',
        }

        this.handleLoadImage = this.handleLoadImage.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.handleSaveBusiness = this.handleSaveBusiness.bind(this);
    }

    componentDidMount() {
        this.handleLoadImage();
    }

    handleLoadImage() {
        UploadService.loadFavicon(window.businessName)
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

    handleSaveBusiness() {
        BusinessDataService
            .updateBusiness({ 
                name: this.state.name,
                faviconPath: this.state.faviconPath
            }, window.businessName)
            .then((response) => {
                window.businessName = this.state.name;
                window.location = `http://${this.state.name}.${window.APP_URL}/admin`;
            }).catch((error) => {
                console.log(error);
            });
    }

    uploadFile(files) {
        var formData = new FormData();
        formData.append("favicon", files[0]);
        UploadService.uploadFavicon(formData, window.businessName)
            .then(response => {
                this.setState({ faviconPath: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="profile-wrap">
                <div className="profile-head">
                    Company Settings
                </div>
                <hr />
                <div className="image-setting">
                    {this.state.image &&
                        <img className="prof-pic" src={this.state.image} alt="company favicon" width="50" height="50" />
                    }
                    <Dropzone className="upload-img-btn" onDrop={this.uploadFile}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="upload-img-btn">Upload favicon</p>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                </div>
                <div className="form-wrap">
                    <div className="input-wrap">
                        <span>Name</span><br />
                        <input value={this.state.name} onChange={this.onNameChange} />
                    </div>
                    <div className="save-btn" onClick={this.handleSaveBusiness}>
                        Save
                    </div>
                </div>
            </div>
        );
    }

}

export default CompanySettingComponent;
