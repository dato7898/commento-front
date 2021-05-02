import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';

class CommentoBoardComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: undefined
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(i, e) {
        if (e === this.state.selected) {
            this.setState({ selected: undefined });
        }
        this.setState({ selected: i });
    }

    render() {

        const responsive = {
            0: { items: 1 },
            767: { items: 2 },
            991: { items: 3 },
        }

        return (
            <div className="main-back">
                <div className="container">
                    <h1 className="text-center">Имя (Доски) для предложений</h1>
                    <hr />
                    <p className="text-center head-descrip">Оставь предложение, голосуй, комментируй и ставь лайки</p>
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="board-list">
                                <div className="post-card">
                                    <div className="post-votes">
                                        <div className="vote-box">
                                            <img src="/icons/upvote.svg" height="14" />
                                            <span>85</span>
                                            <img src="/icons/downvote.svg" height="14" />
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-head">Filter the roadmap by board/category/tag</div>
                                        <div className="board-title">FEATURE REQUESTS</div>
                                    </div>
                                </div>
                                <div className="post-card">
                                    <div className="post-votes">
                                        <div className="vote-box">
                                            <img src="/icons/upvote.svg" height="14" />
                                            <span>60</span>
                                            <img src="/icons/downvote.svg" height="14" />
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-head">Reporting/analytics</div>
                                        <div className="board-title">FEATURE REQUESTS</div>
                                    </div>
                                </div>
                                <div className="post-card">
                                    <div className="post-votes">
                                        <div className="vote-box">
                                            <img src="/icons/upvote.svg" height="14" />
                                            <span>49</span>
                                            <img src="/icons/downvote.svg" height="14" />
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-head">Chrome Extension</div>
                                        <div className="board-title">INTEGRATIONS</div>
                                    </div>
                                </div>
                                <div className="post-card">
                                    <div className="post-votes">
                                        <div className="vote-box">
                                            <img src="/icons/upvote.svg" height="14" />
                                            <span>87</span>
                                            <img src="/icons/downvote.svg" height="14" />
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-head">Azure DevOps</div>
                                        <div className="board-title">INTEGRATIONS</div>
                                    </div>
                                </div>
                                <div className="post-card">
                                    <div className="post-votes">
                                        <div className="vote-box">
                                            <img src="/icons/upvote.svg" height="14" />
                                            <span>85</span>
                                            <img src="/icons/downvote.svg" height="14" />
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-head">Unanswered posts reminders</div>
                                        <div className="board-title">FEATURE REQUESTS</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="post-form">
                                <h2>Создать пост</h2>
                                <textarea 
                                    className="post-form-header"
                                    placeholder="Заголовок (краткое описательное название предложения)" 
                                />
                                <br />
                                <textarea placeholder="Комментарий (любые детали)" />
                                <br />
                                <button>СОЗДАТЬ ПОСТ</button>
                            </div>
                        </div>
                    </div>
                    <div className="road-foot board-foot">
                        <hr />
                        <p className="foot-head">Доска для предложений - показывает все посты (предложения) с:</p>
                        <ul className="foot-text">
                            <li>● заголовком поста</li>
                            <li>● голосами За и Против</li>
                            <li>● статусом (на рассмотрении, запланировано, в процессе, реализовано)</li>
                            <li>● комментариями и лайками</li>
                        </ul>
                        <hr className="footer-hr" />
                    </div>
                    <div className="feed-foot board-quest">
                        <h2>Вопрос - ответ</h2>
                        <Accordion onSelect={this.handleSelect}>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className="my-card-header">
                                        <div>Как оставить пост ?</div>
                                        <div>{this.state.selected === "0" ? "-" : "+"}</div>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                    <p className="foot-text">Нажми на виджет с боку справа, заполни заголовок поста, напиши комментарий, прикрепи при необходимости скрин или картинку</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="1" className="my-card-header">
                                        <div>Что делать, если пост со схожей темой уже существует ?</div>
                                        <div>{this.state.selected === "1" ? "-" : "+"}</div>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <p className="foot-text">Тогда вам просто нужно оставить голос к такому посту, чтобы не дублироваться.</p>
                                        <p className="foot-text">Также можете оставить комментарий, чтобы выразить свою точку зрения о предложенном посте.</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="2" className="my-card-header">
                                        <div>Как понять, что пост со схожей темой уже есть ?</div>
                                        <div>{this.state.selected === "2" ? "-" : "+"}</div>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <p className="foot-text">Когда вы заполняете заголовок при создании поста, то все существующие посты со схожим заголовком сразу отображаются списком.</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="3" className="my-card-header">
                                        <div>Зачем писать комментарий ?</div>
                                        <div>{this.state.selected === "3" ? "-" : "+"}</div>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                        <p className="foot-text">Одним заголовком мысль не выразить, поэтому его дополняют комментарием, чтобы детальнее раскрыть суть о предложенном посте.</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="4" className="my-card-header">
                                        <div>Зачем прикреплять скрин или картинку ?</div>
                                        <div>{this.state.selected === "4" ? "-" : "+"}</div>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="4">
                                    <Card.Body>
                                        <p className="foot-text">Иногда словами сложно все объяснить, в этом случае картинка может сильно помочь показать то, что вы имели в виду!</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(CommentoBoardComponent);
