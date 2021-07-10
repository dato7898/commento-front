import React, { Component } from 'react';
import SpaceDataService from '../../service/SpaceDataService';

class MailingComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subject: "",
            text: "",
            businessName: window.location.host.split('.')[0],
            selectedSpaceId: this.props.selectedSpaceId
        }

        this.onSubjectChange = this.onSubjectChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleSendMailing = this.handleSendMailing.bind(this);
    }

    onSubjectChange(e) {
        this.setState({ subject: e.target.value });
    }

    onTextChange(e) {
        e.target.style.height = "5px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        this.setState({ text: e.target.value });
    }

    handleSendMailing() {
        const { 
            subject, text, businessName, selectedSpaceId
        } = this.state;

        if (subject && text) {
            const mail = {
                subject: subject,
                text: text
            }
            SpaceDataService.sendMailing(mail, businessName, selectedSpaceId)
                .then(() => {})
                .catch(() => {});
        }
    }

    render() {
        return (
            <div className="profile-wrap">
                <div className="profile-head">
                    Рассылка на почту
                </div>
                <hr />
                <div className="form-wrap">
                    <div className="input-wrap">
                        <span>Тема</span><br />
                        <input value={this.state.subject} onChange={this.onSubjectChange} />
                    </div>
                    <div className="input-wrap">
                        <span>Текст сообщения</span><br />
                        <textarea rows="1" value={this.state.text} onChange={this.onTextChange} />
                    </div>
                    <div className="save-btn" onClick={this.handleSendMailing}>
                        Send
                    </div>
                </div>
            </div>
        );
    }

}

export default MailingComponent;
