import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import PostDataService from '../service/PostDataService';
import VoteDataService from '../service/VoteDataService';
import BoardDataService from '../service/BoardDataService';
import { Formik, Form, Field } from 'formik';
import { isUserLoggedIn } from '../service/AuthenticationService';

class CommentoBoardComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: undefined,
            businessId: "commento",
            boardId: this.props.match.params.boardId,
            posts: [],
            title: '',
            details: ''
        }

        this.handleSelect = this.handleSelect.bind(this);
        this.refreshPosts = this.refreshPosts.bind(this);
        this.getAllVotes = this.getAllVotes.bind(this);
        this.onVoteChange = this.onVoteChange.bind(this);
        this.getMyVote = this.getMyVote.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
    }

    componentDidMount() {
        this.refreshPosts();
        this.getBoard();
    }

    getBoard() {
        BoardDataService.retrieveBoard("commento", this.state.boardId)
            .then(res => this.setState({
                boardName: res.data.name
            }));
    }

    refreshPosts() {
        PostDataService.retrieveAllPosts("commento", this.state.boardId)
            .then(res => {
                this.setState({ posts: res.data });
                res.data.map((post, i) => {
                    this.getAllVotes(post, i);
                    this.getMyVote(post, i);
                });
            });
    }

    getAllVotes(post, i) {
        VoteDataService.getAllVotes(post.id)
            .then(res => {
                post.likes = res.data.true - res.data.false;
                this.state.posts[i] = post;
                this.setState({ posts: this.state.posts });
            });
    }

    getMyVote(post, i) {
        if (isUserLoggedIn())
            VoteDataService.getMyVote(post.id)
                .then(res => {
                    post.myvote = res.data.up;
                    this.state.posts[i] = post;
                    this.setState({ posts: this.state.posts });
                });
    }

    onVoteChange(up, post, i) {
        VoteDataService.changeVote(post.id, { "up": up })
            .then(() => {
                this.getAllVotes(post, i);
                this.getMyVote(post, i);
            });
    }

    handleSelect(i, e) {
        if (e === this.state.selected) {
            this.setState({ selected: undefined });
        }
        this.setState({ selected: i });
    }

    onSubmit(values) {
        let post = {
            title: values.title,
            details: values.details,
            isPrivate: false
        };

        PostDataService.createPost(this.state.businessId, this.state.boardId, post)
            .then(() => {
                this.refreshPosts();
            });
    }

    validate(values) {
        let errors = {};
        if (!values.title) {
            errors.title = 'Enter a Title';
        } else if (values.title.length < 5) {
            errors.title = 'Enter atleast 5 Characters in Title';
        }
    
        return errors;
    }

    onTitleChange(e) {
        const title = e.target.value;
        PostDataService.postExist(this.state.businessId, this.state.boardId, title)
            .then(response => {
                response.data === true 
                    ? this.setState({ titleError: 'post with title already exist' }) 
                    : this.setState({ titleError: undefined });
            })
        
        PostDataService.searchPosts(this.state.businessId, this.state.boardId, title)
            .then(response => {
                this.setState({ foundPosts: response.data });
            })
    }

    render() {

        let { title, details } = this.state;

        return (
            <div className="main-back">
                <div className="container">
                    <h1 className="text-center">{this.state.boardName}</h1>
                    <hr />
                    <p className="text-center head-descrip">Оставь предложение, голосуй, комментируй и ставь лайки</p>
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="board-list">
                                {this.state.posts.map((post, i) => 
                                    <div key={post.id} className="post-card">
                                        <div className="post-votes">
                                            <div className="vote-box">
                                                <img src={post.myvote === true ? "/icons/upvote-active.svg" : "/icons/upvote.svg"} height="14" onClick={() => this.onVoteChange(true, post, i)} alt="" />
                                                <span>{post.likes}</span>
                                                <img src={post.myvote === false ? "/icons/downvote-active.svg" : "/icons/downvote.svg"} height="14" onClick={() => this.onVoteChange(false, post, i)} alt="" />
                                            </div>
                                        </div>
                                        <div className="post-content">
                                            <div 
                                                className="post-head" 
                                                onClick={() => this.props.history.push(`/post/${post.id}`, { boardId: post.board.id })}
                                            >
                                                {post.title}
                                            </div>
                                            <div className="board-title">{post.board.name}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="post-form">
                                <h2>Создать пост</h2>
                                <Formik
                                    initialValues={{ title, details }}
                                    onSubmit={this.onSubmit}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    validate={this.validate}
                                    // https://github.com/formium/formik/issues/811
                                    enableReinitialize
                                >
                                    {
                                        (props) => (
                                            <Form>
                                                <fieldset>
                                                    <Field 
                                                        className="form-field" 
                                                        type="textarea" 
                                                        name="title" 
                                                        onKeyUp={this.onTitleChange}
                                                        placeholder="Заголовок (краткое описательное название предложения)"
                                                        as="textarea"
                                                    />
                                                </fieldset>
                                                <fieldset>
                                                    <Field 
                                                        className="form-field" 
                                                        type="textarea" 
                                                        name="details"
                                                        placeholder="Комментарий (любые детали)"
                                                        as="textarea"
                                                    />
                                                </fieldset>
                                                <button className="form-btn" type="submit">Создать пост</button>
                                            </Form>
                                        )
                                    }
                                </Formik>
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
