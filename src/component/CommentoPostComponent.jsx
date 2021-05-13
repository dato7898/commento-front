import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PostDataService from '../service/PostDataService';
import VoteDataService from '../service/VoteDataService';
import CommentDataService from '../service/CommentDataService';
import CommentVoteDataService from '../service/CommentVoteDataService';

class CommentoPostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            businessId: "commento",
            boardId: props.location.state.boardId,
            postId: this.props.match.params.postId,
            title: '',
            details: '',
            status: '',
            authorName: '',
            likes: 0,
            voters: 0,
            comments: []
        };

        this.getPost = this.getPost.bind(this);
        this.getAllComment = this.getAllComment.bind(this);
        this.getAllCommentVotes = this.getAllCommentVotes.bind(this);
        this.getAllChildCommentVotes = this.getAllChildCommentVotes.bind(this);
        this.getMyCommentVote = this.getMyCommentVote.bind(this);
        this.getMyChildCommentVote = this.getMyChildCommentVote.bind(this);
        this.onCommentVoteChange = this.onCommentVoteChange.bind(this);
        this.onChildCommentVoteChange = this.onChildCommentVoteChange.bind(this);
        this.switchShowChildren = this.switchShowChildren.bind(this);

    }

    componentDidMount() {
        this.getPost();
        this.getAllComment();
        this.getAllVotes();
    }

    getPost() {
        PostDataService.retrievePost(this.state.businessId, this.state.boardId, this.state.postId)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    details: res.data.details,
                    status: res.data.status.name,
                    authorName: res.data.author.name
                });
            });
    }

    getAllComment() {
        CommentDataService.retrieveAllRootComments(this.state.postId)
            .then(res => {
                this.setState({ comments: res.data });
                res.data.map((comment, i) => {
                    this.getAllCommentVotes(comment, i);
                    this.getMyCommentVote(comment, i);
                });
            });
    }

    getChildComments(comment, i) {
        CommentDataService.retrieveAllChildComments(comment.id)
            .then(res => {
                comment.children = res.data;
                this.state.comments[i] = comment;
                this.setState({ comments: this.state.comments });
                comment.children.map((childComment, j) => {
                    this.getAllChildCommentVotes(childComment, i, j);
                    this.getMyChildCommentVote(childComment, i, j);
                });
            });
    }

    getAllVotes() {
        VoteDataService.getAllVotes(this.state.postId)
            .then(res => this.setState({
                likes: res.data.true - res.data.false,
                voters: res.data.true + res.data.false
            }));
    }

    getAllCommentVotes(comment, i) {
        CommentVoteDataService.getAllVotes(comment.id)
            .then(res => {
                comment.likes = res.data.true - res.data.false;
                this.state.comments[i] = comment;
                this.setState({ comments: this.state.comments });
            });
    }

    getAllChildCommentVotes(comment, i, j) {
        CommentVoteDataService.getAllVotes(comment.id)
            .then(res => {
                comment.likes = res.data.true - res.data.false;
                this.state.comments[i].children[j] = comment;
                this.setState({ comments: this.state.comments });
            });
    }

    getMyCommentVote(comment, i) {
        CommentVoteDataService.getMyVote(comment.id)
            .then(res => {
                comment.myvote = res.data.up;
                this.state.comments[i] = comment;
                this.setState({ comments: this.state.comments });
            });
    }

    getMyChildCommentVote(comment, i, j) {
        CommentVoteDataService.getMyVote(comment.id)
            .then(res => {
                comment.myvote = res.data.up;
                this.state.comments[i].children[j] = comment;
                this.setState({ comments: this.state.comments });
            });
    }

    onCommentVoteChange(up, comment, i) {
        CommentVoteDataService.changeVote(comment.id, { "up": up })
            .then(() => {
                this.getAllCommentVotes(comment, i);
                this.getMyCommentVote(comment, i);
            });
    }

    onChildCommentVoteChange(up, comment, i, j) {
        CommentVoteDataService.changeVote(comment.id, { "up": up })
            .then(() => {
                this.getAllChildCommentVotes(comment, i);
                this.getMyChildCommentVote(comment, i);
            });
    }

    switchShowChildren(comment, i) {
        comment.showChildren = !comment.showChildren;
        this.state.comments[i] = comment;
        this.setState({ comments: this.state.comments });
    }

    render() {

        let { 
            title, details, status, 
            authorName, likes, voters,
            comments
        } = this.state;

        return (
            <div className="main-back">
                <div className="container">
                    <h1 className="text-center">{title}</h1>
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
                                        {comments.map((comment, i) => 
                                            <div key={comment.id}>
                                                <div key={comment.id} style={{ display: "flex" }}>
                                                    <div>
                                                        <img src="/img/user-avatar.jpg" className="comment-avatar" />
                                                    </div>
                                                    <div className="comment-renderer">
                                                        <div className="comment-author">
                                                            <div className="comment-author-name">
                                                                {comment.author.name}
                                                            </div>
                                                            <div className="comment-date">
                                                                4 года назад
                                                            </div>
                                                        </div>
                                                        <div className="comment-content">
                                                            {comment.value}
                                                        </div>
                                                        <div className="comment-votes">
                                                            <div>
                                                                <img 
                                                                    src={comment.myvote === true ? "/icons/like-hand-active.png" : "/icons/like-hand.png"} 
                                                                    className="like-icon" onClick={() => this.onCommentVoteChange(true, comment, i)} 
                                                                />
                                                            </div>
                                                            <span className="comment-vote-count">
                                                                {comment.likes}
                                                            </span>
                                                            <div>
                                                                <img 
                                                                    src={comment.myvote === false ? "/icons/dislike-hand-active.png" : "/icons/dislike-hand.png"} 
                                                                    className="dislike-icon" onClick={() => this.onCommentVoteChange(false, comment, i)} 
                                                                />
                                                            </div>
                                                            <div className="reply-button">
                                                                Ответить
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {comment.childrenCount &&
                                                    <div style={{ marginLeft: "56px" }}>
                                                        <div className="hide-button" onClick={() => {
                                                            if (comment.children === undefined)
                                                                this.getChildComments(comment, i);
                                                            this.switchShowChildren(comment, i);
                                                        }}>
                                                            {comment.showChildren ? "Скрыть" : "Показать"} {comment.childrenCount} ответа
                                                        </div>
                                                        {comment.showChildren && comment.children && comment.children.map((childComment, j) => 
                                                            <div key={childComment.id} style={{ display: "flex" }}>
                                                                <div className="no-comment-avatar" style={{ backgroundColor: "rgb(170, 187, 221)" }}>
                                                                    D
                                                                </div>
                                                                <div className="comment-renderer">
                                                                    <div className="comment-author">
                                                                        <div className="comment-author-name">
                                                                            {childComment.author.name}
                                                                        </div>
                                                                        <div className="comment-date">
                                                                            4 года назад
                                                                        </div>
                                                                    </div>
                                                                    <div className="comment-content">
                                                                        {childComment.value}
                                                                    </div>
                                                                    <div className="comment-votes">
                                                                        <div>
                                                                            <img 
                                                                                src={childComment.myvote === true ? "/icons/like-hand-active.png" : "/icons/like-hand.png"} 
                                                                                className="like-icon" onClick={() => this.onChildCommentVoteChange(true, childComment, i, j)} 
                                                                            />
                                                                        </div>
                                                                        <span className="comment-vote-count">
                                                                            {childComment.likes}
                                                                        </span>
                                                                        <div>
                                                                            <img 
                                                                                src={childComment.myvote === false ? "/icons/dislike-hand-active.png" : "/icons/dislike-hand.png"} 
                                                                                className="dislike-icon" onClick={() => this.onChildCommentVoteChange(false, childComment, i, j)} 
                                                                            />
                                                                        </div>
                                                                        <div className="reply-button">
                                                                            Ответить
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                }
                                            </div>
                                        )}
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
