import React, { Component } from 'react';

class AdminsInvitesComponent extends Component {

    render() {
        return (
            <div className="profile-wrap">
                <div className="profile-head">
                    Admins
                </div>
                <hr />
                <div className="form-wrap">
                    <div className="invite-text">Invite admins via email:</div>
                    <div className="input-wrap invite-input">
                        <input value="" placeholder="Email addresses, separeted by spaces" />
                    </div>
                    <div className="save-btn invite-btn">
                        Send invite
                    </div>
                </div>
            </div>
        );
    }

}

export default AdminsInvitesComponent;
