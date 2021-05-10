import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import { Accordion, Card } from 'react-bootstrap';

class FeedbackComponent extends Component {

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
            <>
                <div className="main-back feed-back">
                    <div className="container">
                        <h1 className="text-center">Оставьте Обратную Связь</h1>
                        <hr />
                        <div className="text-center head-descrip" style={{ paddingBottom: "60px" }}>
                            <p>Помогите улучшить качество нашего продукта / сервиса для вас.</p>
                            <p>Мы всегда стремимся совершенствоваться, благодаря Вам это получится сделать быстрее!!!</p>
                            <p>Оставьте свое предложение команде разработчиков в виде поста на одной из досок ниже</p>
                            <img src="/icons/iconfinder_25-Arrow_down_3672656.png" />
                            <AliceCarousel infinite={true} responsive={responsive} controlsStrategy={"alternate"} >
                                <div className="carousel-card">
                                    <div className="carousel-card-back">
                                        <div className="carousel-card-percent">
                                            66%
                                        </div>
                                        <div className="flex-break" />
                                        <div onClick={() => this.props.history.push('/board/1')} className="carousel-card-ref">
                                            Функционал
                                        </div>
                                        <div className="flex-break" />
                                        <p>На этой доске расположены посты с предложениями по улучшению функционала нашего сервиса</p>
                                    </div>
                                </div>
                                <div className="carousel-card">
                                    <div className="carousel-card-back">
                                        <div className="carousel-card-percent">
                                            14%
                                        </div>
                                        <div className="flex-break" />
                                        <div onClick={() => this.props.history.push('/board/2')} className="carousel-card-ref">
                                            Интеграции
                                        </div>
                                        <div className="flex-break" />
                                        <p>Данная доска для предложений по интеграциям с другими сервисами, вашим сайтом / приложением, например: Инстаграм, Телеграм, GitHub</p>
                                    </div>
                                </div>
                                <div className="carousel-card">
                                    <div className="carousel-card-back">
                                        <div className="carousel-card-percent">
                                            7%
                                        </div>
                                        <div className="flex-break" />
                                        <div onClick={() => this.props.history.push('/board/3')} className="carousel-card-ref">
                                            Языки
                                        </div>
                                        <div className="flex-break" />
                                        <p>А здесь вы можете предложить внедрить перевод нашего сайта на другие близкие вам языки, чтобы еще лучше понимать друг друга и своих клиентов!</p>
                                    </div>
                                </div>
                                <div className="carousel-card">
                                    <div className="carousel-card-back">
                                        <div className="carousel-card-percent">
                                            13%
                                        </div>
                                        <div className="flex-break" />
                                        <div onClick={() => this.props.history.push('/board/4')} className="carousel-card-ref">
                                            Коммуникация
                                        </div>
                                        <div className="flex-break" />
                                        <p>Желаете улучшить способы связи с нами или отметить ошибки при общении с вами, то вам сюда!</p>
                                    </div>
                                </div>
                            </AliceCarousel>
                        </div>
                    </div>
                </div>
                <div className="feed-foot container">
                    <h2>Вопрос - ответ</h2>
                    <Accordion style={{ marginTop: "30px" }} onSelect={this.handleSelect}>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className="my-card-header">
                                    <div>Что такое Пост ?</div>
                                    <div>{this.state.selected === "0" ? "-" : "+"}</div>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                <p className="foot-text"><span>Пост</span> - это ваше предложение или пожелание:</p>
                                <ul className="foot-text">
                                    <li>● руководству по управлению компанией</li>
                                    <li>● разработчикам по добавлению функционала</li>
                                    <li>● дизайнерам по улучшению интерфейса и дизайна</li>
                                    <li>● или просто по улучшению, которое вы бы хотели видеть в продукте или сервисе, которым пользуетесь</li>
                                    <li>● можно Голосовать За или Против Поста, чтобы не повторяться, если вы разделяете или не согласны с предложением пользователя</li>
                                </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1" className="my-card-header">
                                    <div>Что такое Голос за пост ?</div>
                                    <div>{this.state.selected === "1" ? "-" : "+"}</div>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <p className="foot-text"><span>Голос</span> - это ВЫ и ваше мнение!</p>
                                    <ul className="foot-text">
                                        <li>● голосовать можно по каждому посту</li>
                                        <li>● голосуя за или против Вы способствуете продвижению поста или его не принятия во внимание со стороны ответственных лиц компании</li>
                                        <li>● <span>ЗА</span> - если вы Согласны с автором поста о необходимости добавления предложения или пожелания</li>
                                        <li>● <span>ПРОТИВ</span> - если вы Не Разделяете мнение автора поста</li>
                                        <li>● чем больше голосов у поста, тем выше его рейтинг, означающее что большинство пользователей желает того же самого</li>
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="2" className="my-card-header">
                                    <div>Что такое Комментарий к посту ?</div>
                                    <div>{this.state.selected === "2" ? "-" : "+"}</div>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <p className="foot-text"><span>Комментарий</span> - это ваше личное мнение или видение, что и как лучше!</p>
                                    <ul className="foot-text">
                                        <li>● Оставляя комментарий к посту, вы можете дополнить мнение автора или выразить собственное</li>
                                        <li>● Также можно Лайкать комментарии, чтобы не повторяться, если вы разделяете мнение клиента со схожими взглядами</li>
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="3" className="my-card-header">
                                    <div>Что такое Лайк к комментарию ?</div>
                                    <div>{this.state.selected === "3" ? "-" : "+"}</div>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    <p className="foot-text"><span>Лайк</span> - это по сути тоже своего рода Ваш голос, но только за отдельный комментарий!</p>
                                    <ul className="foot-text">
                                        <li>● лайки также влияют на продвижение комментария</li>
                                        <li>● чем больше лайков у комментария, тем выше его рейтинг, означающее что большинство пользователей имеет такое же мнение</li>
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </>
        );
    }

}

export default withRouter(FeedbackComponent);
