import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PostDataService from '../service/PostDataService';
import VoteDataService from '../service/VoteDataService';

class CommentoPostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            businessId: "commento",
            boardId: 1,
            postId: this.props.match.params.postId,
            title: '',
            details: '',
            status: '',
            authorName: '',
            likes: 0,
            voters: 0
        };

        this.getPost = this.getPost.bind(this);

    }

    componentDidMount() {
        this.getPost();
        this.getAllVotes();
    }

    getPost() {
        PostDataService.retrievePost(this.state.businessId, this.state.boardId, this.state.postId)
            .then(res => this.setState({
                title: res.data.title,
                details: res.data.details,
                status: res.data.status.name,
                authorName: res.data.author.name
            }));
    }

    getAllVotes() {
        VoteDataService.getAllVotes(this.state.postId)
            .then(res => this.setState({
                likes: res.data.true - res.data.false,
                voters: res.data.true + res.data.false
            }));
    }

    render() {

        let { 
            title, details, status, 
            authorName, likes, voters
        } = this.state;

        return (
            <div className="main-back">
                <div className="container">
                    <h1 className="text-center">Имя (Поста)</h1>
                    <hr />
                    <p className="text-center head-descrip">Голосуй, комментируй и ставь лайки</p>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 votes-col">
                            <div className="white-back">
                                <div className="votes-box">
                                    <p className="vote-head">
                                        VOTERS
                                    </p>
                                    <div className="vote-avatars">
                                        {voters > 5 ? <div className="more-votes"> + {voters - 5}</div> : ''}
                                        <img src="/img/user-icon-1.jpg" className="vote-avatar" />
                                        <div className="no-avatar" style={{ backgroundColor: "rgb(170, 187, 221)" }}>T</div>
                                        <div className="no-avatar" style={{ backgroundColor: "rgb(126, 76, 26)" }}>D</div>
                                        <div className="no-avatar" style={{ backgroundColor: "rgb(217, 92, 20)" }}>S</div>
                                        <img src="/img/user-icon-5.jpg" className="vote-avatar" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12 post-col">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div className="white-back">
                                    <div className="post-header">
                                        <div className="post-votes">
                                            <div className="vote-box status-vote">
                                                <img src="/icons/upvote.svg" height="14" />
                                                <span>{likes}</span>
                                                <img src="/icons/downvote.svg" height="14" />
                                            </div>
                                        </div>
                                        <div className="status-title">
                                            <div className="post-title">
                                                {title}
                                            </div>
                                            <div className="post-status">
                                                {status}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="post-author">
                                            <div className="user-avatar">
                                                <img src="/img/user-avatar.jpg" className="vote-avatar" />
                                            </div>
                                            <div className="user-info">
                                                {authorName}
                                            </div>
                                        </div>
                                        <div className="post-body">
                                            <div className="details-post">
                                                {details}
                                            </div>
                                        </div>
                                        <div className="post-timestamp-link">
                                            May 21, 2018
                                        </div>
                                    </div>
                                    <div className="comment-composer">
                                        <textarea className="" placeholder="Leave a comment" rows="1" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="white-back" style={{ marginTop: "20px" }}>
                                    <div>
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                <img src="/img/user-avatar.jpg" className="comment-avatar" />
                                            </div>
                                            <div className="comment-renderer">
                                                <div className="comment-author">
                                                    <div className="comment-author-name">
                                                        nagen38
                                                    </div>
                                                    <div className="comment-date">
                                                        4 года назад
                                                    </div>
                                                </div>
                                                <div className="comment-content">
                                                    this is perhaps my favorite video you have done. The song is awesome and the editing to the music is brilliant. I've lost count how many times I've played this video over the last couple of years
                                                </div>
                                                <div className="comment-votes">
                                                    <div>
                                                        <img src="/icons/like-hand.png" className="like-icon" />
                                                    </div>
                                                    <span className="comment-vote-count">
                                                        62
                                                    </span>
                                                    <div>
                                                        <img src="/icons/dislike-hand.png" className="dislike-icon" />
                                                    </div>
                                                    <div className="reply-button">
                                                        Ответить
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: "56px" }}>
                                            <div className="hide-button">
                                                Скрыть 3 ответа
                                            </div>
                                            <div>
                                                <div style={{ display: "flex" }}>
                                                    <div className="no-comment-avatar" style={{ backgroundColor: "rgb(170, 187, 221)" }}>
                                                       D
                                                    </div>
                                                    <div className="comment-renderer">
                                                        <div className="comment-author">
                                                            <div className="comment-author-name">                  
                                                                iwilltubeyouall
                                                            </div>
                                                            <div className="comment-date">
                                                                1 год назад
                                                            </div>
                                                        </div>
                                                        <div className="comment-content">
                                                            Same with me :)
                                                        </div>
                                                        <div className="comment-votes">
                                                            <div>
                                                                <img src="/icons/like-hand.png" className="like-icon" />
                                                            </div>
                                                            <span className="comment-vote-count">
                                                                2
                                                            </span>
                                                            <div>
                                                                <img src="/icons/dislike-hand.png" className="dislike-icon" />
                                                            </div>
                                                            <div className="reply-button">
                                                                Ответить
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ display: "flex" }}>
                                                    <div className="no-comment-avatar" style={{ backgroundColor: "rgb(217, 92, 20)" }}>
                                                       M
                                                    </div>
                                                    <div className="comment-renderer">
                                                        <div className="comment-author">
                                                            <div className="comment-author-name">                  
                                                                Mike Woitt
                                                            </div>
                                                            <div className="comment-date">
                                                                6 месяцев назад
                                                            </div>
                                                        </div>
                                                        <div className="comment-content">
                                                            When I get stoned on weed I like to listen to this.
                                                        </div>
                                                        <div className="comment-votes">
                                                            <div>
                                                                <img src="/icons/like-hand.png" className="like-icon" />
                                                            </div>
                                                            <div>
                                                                <img src="/icons/dislike-hand.png" className="dislike-icon" />
                                                            </div>
                                                            <div className="reply-button">
                                                                Ответить
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(CommentoPostComponent);
