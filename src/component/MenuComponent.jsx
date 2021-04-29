import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isUserLoggedIn as checkUserLogin, logout } from '../service/AuthenticationService'

class MenuComponent extends Component {

    componentDidMount() {
        this.props.handleLoadImage();
    }

    render() {
        const isUserLoggedIn = checkUserLogin();

        return (
            <header >
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark"
                    style={{ background: "linear-gradient(0deg, #8f8f8f 0%, #434343 100%)" }}
                >
                    <div className="container d-flex justify-content-between">
                        <div style={{ display: "flex", flexDirection: "column", marginRight: "12%" }}>
                            <a 
                                href="/" className="navbar-brand"
                                style={{ lineHeight: "1.4375", fontSize: "32px", fontFamily: "'Roboto Slab', serif", fontWeight: "300", padding: "0", letterSpacing: ".042em" }}
                            >
                                Commento
                            </a>
                            <span
                                style={{ fontFamily: "Rubik,sans-serif", fontWeight: "500", fontSize: "12px", color: "#FFFFFF", letterSpacing: ".142em" }}
                            >
                                Feedback system
                            </span>
                        </div>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse" id="navbarCollapse">

                            <ul 
                                className="navbar-nav navbar-collapse justify-content-center"
                                style={{ fontFamily: "Rubik,sans-serif", fontSize: "16px", color: "#FFFFFF", fontWeight: "700" }}
                            >
                                <li className="nav-item">
                                    <a href="/feedback" className="head-link">
                                        Обратная связь
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/roadmap" className="head-link">
                                        Дорожная карта
                                    </a>
                                </li>
                            </ul>

                            <ul className="navbar-nav navbar-collapse justify-content-end">
                                {!isUserLoggedIn && <li className="nav-item">
                                    <Link 
                                        className="nav-link auth-link" to="/register"
                                    >
                                        ЗАРЕГИСТРИРОВАТЬСЯ
                                    </Link>
                                </li>}
                                {!isUserLoggedIn && <li className="nav-item">
                                    <Link 
                                        className="nav-link auth-link" to="/login"
                                    >
                                        ВОЙТИ
                                    </Link>
                                </li>}
                                {isUserLoggedIn && <li className="nav-item">
                                    <Link 
                                        className="nav-link auth-link" to="/login" 
                                        onClick={() => {
                                            logout();
                                            this.props.handleClearImage();
                                        }}
                                    >
                                        ВЫЙТИ
                                    </Link>
                                </li>}
                                {isUserLoggedIn && this.props.image &&
                                    <img className="prof-pic" src={this.props.image} alt="profile picture" width="40" height="40" />
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(MenuComponent);