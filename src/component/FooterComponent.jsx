import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class FooterComponent extends Component {
    render() {
        return (
            <footer style={{ background: "#434343", color: "#FFFFFF", paddingTop: "20px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <p><em style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: "700" }}>Commento StartUp</em></p>
                            <p className="contacts" style={{ fontSize: "18px" }}>Сервис систематизации обратной связи с голосованием</p>
                            <p className="foot-text">Наша компания приложит все усилия, чтобы детально проанализировать конкретный проект или бизнес и предложить решение по сбору обратной связи, соответствующее вашим требованиям и пожеланиям.</p>
                        </div>
                        <div className="col-md-2 text-center">
                            <p className="contacts">Контакты</p>
                        </div>
                        <div className="col-md-3 text-right">
                            <p className="contacts">Продукт</p>
                            <p className="foot-text about">О нас</p>
                            <p className="foot-text about">Цена</p>
                            <p className="foot-text about">Функционал</p>
                            <p className="foot-text about">Дорожная карта</p>
                            <p className="foot-text about">Обратная связь</p>
                            <p className="foot-text about">Доски</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 security">
                            <a className="foot-link" href="#">PRIVACY</a>
                            <a className="foot-link" href="#">TERMS</a>
                            <a className="foot-link" href="#">SECURITY</a>
                        </div>
                        <div className="col-md-4 text-center">
                            <p className="created">Created by <span>Commento</span></p>
                        </div>
                        <div className="col-md-4 text-right">
                            <p className="rights">Все права защищены</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default withRouter(FooterComponent);
