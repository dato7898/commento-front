import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isUserLoggedIn as checkUserLogin, logout } from '../service/AuthenticationService';

class MenuComponent extends Component {

    render() {
        const isUserLoggedIn = checkUserLogin();

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="/" className="navbar-brand">Commento</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/post">Posts</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/register">Sign up</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Sign in</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/login" onClick={() => {
                            logout();
                        }}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(MenuComponent)