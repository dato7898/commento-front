import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';

class AdminPanelComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }

        this.spaceSelect = this.spaceSelect.bind(this);
        this.workSelect = this.workSelect.bind(this);
        this.boardSelect = this.boardSelect.bind(this);   
    }

    spaceSelect() {
        this.setState({ spaceSelect: !this.state.spaceSelect });
    }

    workSelect() {
        this.setState({ workSelect: !this.state.workSelect });
    }

    boardSelect() {
        this.setState({ boardSelect: !this.state.boardSelect });
    }

    render() {
        return (
            <div className="container admin-panel-wrap">
                <div className="row">
                    <div className="col-md-3">
                        <div className="admin-menu">
                            <span className="head-span">Вы и Компания</span>
                            <span className="admin-panel-section">
                                <img src="./icons/home.svg" alt="home" /> 
                                Home
                            </span>
                            <span className="admin-panel-section">
                                <img src="./icons/profile.svg" alt="profile" /> 
                                Мои данные
                            </span>
                            <span className="admin-panel-section">
                                <img src="./icons/building.svg" alt="building" />
                                Компания
                            </span>
                            <span className="admin-panel-section">
                                <img src="./icons/dollar.svg" alt="dollar" />
                                Тарифы и Счета
                            </span>
                            <hr className="head-hr" />
                            <Accordion onSelect={this.spaceSelect}>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                            {this.state.spaceSelect ? 
                                                <img src="./icons/arrow-up.svg" alt="arrow up" />
                                                : <img src="./icons/arrow-down.svg" alt="arrow down" />
                                            }
                                            <span>Пространства</span>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <span>Офис</span>
                                            <span>Склады</span>
                                            <span>Поставщики</span>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            <hr />
                            <span className="spaces-link data-link">
                                <img src="./icons/gear.svg" alt="gear" />
                                Данные пространства
                            </span>
                            <span className="spaces-link admin-link">
                                <img src="./icons/security.svg" alt="security" />
                                Админы пространства
                            </span>
                            <Accordion onSelect={this.workSelect}>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                            {this.state.workSelect ? 
                                                <img src="./icons/arrow-up.svg" alt="arrow up" />
                                                : <img src="./icons/arrow-down.svg" alt="arrow down" />
                                            }
                                            <span>Рабочие места пространства</span>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <span>Менеджмент</span>
                                            <span>Маркетинг</span>
                                            <span>IT отдел</span>
                                            <span>Call-центр</span>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            <hr />
                            <Accordion onSelect={this.boardSelect}>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                            {this.state.boardSelect ? 
                                                <img src="./icons/arrow-up.svg" alt="arrow up" />
                                                : <img src="./icons/arrow-down.svg" alt="arrow down" />
                                            }
                                            <span>Доски рабочего места</span>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <span>Функции</span>
                                            <span>Уровень сервиса</span>
                                            <span>Качество продукта</span>
                                            <span>Иные отзывы</span>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            <hr />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="admin-dashboard">

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(AdminPanelComponent);
