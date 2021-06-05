import React, { Component } from 'react';

class PlansAndBillingsComponent extends Component {

    render() {
        return (
            <div className="profile-wrap">
                <div className="profile-head">
                    Plans & Billings
                </div>
                <hr />
                <div className="form-wrap">
                    <div className="sub-text-wrap">
                        <div>Subscription: <b>Free Trial</b></div>
                        <div>Trial expires: <b>May 14, 2021</b></div>
                    </div>
                    <div className="sub-text-wrap">
                        <div>Tracked users: <b>1</b></div>
                    </div>
                    <div className="sub-text-wrap">
                        <div>Price: <b>$50/mo </b><a href="#">See invoice history</a></div>
                    </div>
                    <div className="save-btn subscribe">
                        Subscribe
                    </div>
                    <a className="sub-price" href="#">See our pricing</a>
                </div>
            </div>
        );
    }

}

export default PlansAndBillingsComponent;
