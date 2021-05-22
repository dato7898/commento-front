import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';

class AdminPanelComponent extends Component {

    render() {
        return (
            <div className="container admin-panel-wrap">
                <div className="row">
                    <div className="col-md-3">
                        <div className="admin-menu">
                            <span>Вы и Компания</span>
                            <span className="admin-panel-section">Home</span>
                            <span className="admin-panel-section">Мои данные</span>
                            <span className="admin-panel-section">Компания</span>
                            <span className="admin-panel-section">Тарифы и Счета</span>
                            <hr />
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
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
