import React, { Component } from 'react';
import Cookies from 'js-cookie';
import PostDataService from '../../service/PostDataService';
import CommentDataService from '../../service/CommentDataService';
import VoteDataService from '../../service/VoteDataService';
import CommentCreateComponent from '../comment/CommentCreateComponent';
import CommentComponent from '../comment/CommentComponent';
import { isUserLoggedIn } from '../../service/AuthenticationService';

class ViewPostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // а что если больше Int'a?
            businessId: this.props.match.params.businessId,
            boardId: this.props.match.params.boardId,
            postId: this.props.match.params.postId,
            title: '',
            details: '',
            isPrivate: false,
            comments: [],
            likes: 0,
            dislikes: 0,
            myvote: undefined,
            userId: Cookies.get(window.USER_ID),
            commentId: undefined
        };
        this.getAllVotes = this.getAllVotes.bind(this);
        this.onVoteChange = this.onVoteChange.bind(this);
        this.getMyVote = this.getMyVote.bind(this);
        this.getPost = this.getPost.bind(this);
        this.getAllComment = this.getAllComment.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
    }

    componentDidMount() {
        this.getPost();
        this.getAllComment();
        this.getAllVotes();
        if (isUserLoggedIn()) {
            this.getMyVote();
        }
    }

    getPost() {
        PostDataService.retrievePost(this.state.businessId, this.state.boardId, this.state.postId)
            .then(response => this.setState({
                details: response.data.details,
                title: response.data.title,
                isPrivate: response.data.isPrivate
            }));
    }

    getAllComment() {
        CommentDataService.retrieveAllComments(this.state.postId)
            .then(response => this.setState({
                comments: response.data
            }));
    }

    getAllVotes() {
        VoteDataService.getAllVotes(this.state.postId)
            .then(response => this.setState({
                likes: response.data.true,
                dislikes: response.data.false
            }));
    }

    getMyVote() {
        VoteDataService.getMyVote(this.state.postId)
            .then(response => this.setState({
                myvote: response.data.up
            }));
    }

    onVoteChange(up) {
        VoteDataService.changeVote(this.state.postId, { "up": up })
            .then(() => {
                this.getAllVotes();
                this.getMyVote();
            });
    }

    onCommentSubmit(values) {
        let comment = {
            value: values.message
        };

        if (this.state.commentId === "new") {
            CommentDataService.createComment(this.state.postId, comment)
                .then(() => {
                    this.setState({ commentId: undefined });
                    this.getAllComment();
                });
        } else {
            CommentDataService.updateComment(this.state.commentId, comment)
                .then(() => {
                    this.setState({ commentId: undefined });
                    this.getAllComment();
                });
        }
    }

    onCommentDelete(commentId) {
        CommentDataService.deleteComment(commentId)
            .then(() => {
                this.getAllComment();
            });
    }

    onChangeComment(commentId) {
        this.setState({ commentId: commentId });
    }

    render() {
        let { 
            title, details, myvote, likes, 
            dislikes, comments, message, 
            userId, commentId
        } = this.state;

        return (
            <div className="class2">
                <h3>Post</h3>
                <div className="container">
                   <h1>Title: {title}</h1>
                   <h2>Description: {details}</h2>
                    <div>
                        <button className={"btn" + (myvote === true ? " btn-primary" : "")} onClick={() => this.onVoteChange(true)}>Like</button>
                        <label>{likes}</label>
                    </div>
                    <div>
                        <button className={"btn" + (myvote === false ? " btn-danger" : "")} onClick={() => this.onVoteChange(false)}>Dislike</button>
                        <label>{dislikes}</label>
                    </div>
                    <div>
                        <h3>Comments:</h3>
                        {comments.map((e, i) => 
                            <div key={i}>
                                <h4>Author: {e.author.name}</h4>
                                <h5>Message: {e.value}</h5>
                                {e.isOwner &&
                                    <>
                                    {commentId === e.id ?
                                        <CommentCreateComponent message={message} onCommentSubmit={this.onCommentSubmit} /> :
                                        <>
                                            <button className="btn btn-primary" onClick={() => this.onChangeComment(e.id)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => this.onCommentDelete(e.id)}>Delete</button>
                                        </>
                                    }
                                    </>
                                }
                                <CommentComponent commentId={e.id} />
                            </div>
                        )}
                        {commentId === "new" ?
                            <CommentCreateComponent message={message} onCommentSubmit={this.onCommentSubmit} /> :
                            <button className="btn btn-primary" onClick={() => this.onChangeComment("new")}>Create</button>
                        }
                    </div> 
                </div>
            </div>
        );
    }

}

export default ViewPostComponent;