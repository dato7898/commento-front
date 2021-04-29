import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class RoadmapComponent extends Component {

    render() {
        return (
            <div className="main-back">
                <div className="container">
                    <h1 className="text-center">Дорожная карта (Roadmap)</h1>
                    <hr />
                    <p className="text-center head-descrip">Отслеживай на какой стадии находится предложение</p>
                    <div className="row">
                        <div className="col-md-3 col-sm-6 road-card">
                            <div className="road-back">
                                <div className="road-card-head">
                                    НА РАССМОТРЕНИИ
                                </div>
                                <img src="img/5ff5dced4de96600214ce028_optimized_1396.webp"/>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 road-card">
                            <div className="road-back">
                                <div className="road-card-head">
                                    ЗАПЛАНИРОВАНО
                                </div>
                                <img src="img/60800a4e9365b400223d8730_optimized_1396.webp"/>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 road-card">
                            <div className="road-back">
                                <div className="road-card-head">
                                    В ПРОЦЕССЕ
                                </div>
                                <img src="img/60800ac4d898cf0022c544b9_optimized_1396.webp"/>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 road-card">
                            <div className="road-back">
                                <div className="road-card-head">
                                    РЕАЛИЗОВАНО
                                </div>
                                <img src="img/60800b1f39dce40021f8aca1_optimized_1316.png"/>
                            </div>
                        </div>
                    </div>
                    <div className="road-foot">
                        <hr />
                        <p className="foot-head">Дорожная карта</p>
                        <p className="foot-text">Показывает путь и планы по внедрению предложений в бизнес-процессы на основе Ваших голосов!</p>
                        <ul className="foot-text">
                            <li>● простыми словами, как и когда компания собирается запускать предложенное улучшение продукта или услуги</li>
                            <li>● или человек планирует изменить свой характер или образ жизни, план контента своего канала на YouTube или аккаунта в Инстаграм</li>
                        </ul>
                        <p className="foot-head">Статус поста на Дорожной карте</p>
                        <p className="foot-text">Определяет на какой стадии находится пост на пути Дорожной карты, позволяет понять, что уже в планах и когда примерно будет внедрено!</p>
                        <p className="foot-text">Основные пользовательские статусы постов:</p>
                        <ul className="foot-text count-list">
                            <li>1. <span>На рассмотрении</span> - принят во внимание компанией или человеком</li>
                            <li>2. <span>Запланировано</span> - находится в планах по реализации</li>
                            <li>3. <span>В процессе</span> - уже реализовывается</li>
                            <li>4. <span>Реализовано</span> - готов к использованию</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(RoadmapComponent);
