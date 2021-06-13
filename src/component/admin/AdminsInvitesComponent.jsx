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
                <div className="admin-list">
                    <img src="/img/user-avatar.jpg" alt="avatar" width="40" height="40" />
                    <div>
                        <div className="admin-name">Amir</div>
                        <div className="admin-email">666amir777@mail.ru</div>
                    </div>
                </div>
            </div>
        );
    }

}

export default AdminsInvitesComponent;
