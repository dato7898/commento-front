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
            businessName: this.props.match.params.businessName,
            boardId: this.props.match.params.boardId,
            postId: this.props.match.params.postId,
            title: '',
            status: '',
            details: '',
            isPrivate: false,
            comments: [],
            likes: 0,
            dislikes: 0,
            myvote: undefined,
            userId: Cookies.get(window.USER_ID),
            commentId: undefined,
            parentId: undefined
        };
        this.getAllVotes = this.getAllVotes.bind(this);
        this.onVoteChange = this.onVoteChange.bind(this);
        this.getMyVote = this.getMyVote.bind(this);
        this.getPost = this.getPost.bind(this);
        this.getAllComment = this.getAllComment.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onReplyComment = this.onReplyComment.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
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
        PostDataService.retrievePost(this.state.businessName, this.state.boardId, this.state.postId)
            .then(response => this.setState({
                details: response.data.details,
                status: response.data.status.name,
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
            value: values.message,
            parentId: this.state.parentId
        };

        if (this.state.commentId === "new" || this.state.parentId !== undefined) {
            CommentDataService.createComment(this.state.postId, comment)
                .then(() => {
                    this.setState({ commentId: undefined, parentId: undefined });
                    this.getAllComment();
                });
        } else {
            CommentDataService.updateComment(this.state.commentId, comment)
                .then(() => {
                    this.setState({ commentId: undefined, parentId: undefined });
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
        this.setState({ commentId: commentId, parentId: undefined });
    }

    onReplyComment(parentId) {
        this.setState({ parentId: parentId, commentId: undefined });
    }

    onStatusChange() {
        PostDataService.updatePostStatus(this.state.businessName, this.state.boardId, this.state.postId, 2)
            .then(response => this.setState({
                details: response.data.details,
                status: response.data.status.name,
                title: response.data.title,
                isPrivate: response.data.isPrivate
            }));
    }

    render() {
        let { 
            title, details, myvote, likes, 
            dislikes, comments, userId,
            commentId, parentId, status
        } = this.state;

        return (
            <div className="class2">
                <h3>Post</h3>
                <div className="container">
                   <h1>Title: {title} {status}</h1>
                   <button className={"btn btn-primary"} onClick={() => this.onStatusChange()}>Change status</button>
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
                                <h5>Message: {e.parent && "@" + e.parent.author.name} {e.value}</h5>
                                {e.isOwner &&
                                    <>
                                    {commentId === e.id ?
                                        <CommentCreateComponent onCommentSubmit={this.onCommentSubmit} /> :
                                        <>
                                            <button className="btn btn-primary" onClick={() => this.onChangeComment(e.id)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => this.onCommentDelete(e.id)}>Delete</button>
                                        </>
                                    }
                                    </>
                                }
                                <CommentComponent commentId={e.id} />
                                {parentId === e.id ?
                                    <CommentCreateComponent onCommentSubmit={this.onCommentSubmit} /> :
                                    <button className="btn btn-primary" onClick={() => this.onReplyComment(e.id)}>Reply</button>
                                }
                            </div>
                        )}
                        {commentId === "new" ?
                            <CommentCreateComponent onCommentSubmit={this.onCommentSubmit} /> :
                            <button className="btn btn-primary" onClick={() => this.onChangeComment("new")}>Create</button>
                        }
                    </div> 
                </div>
            </div>
        );
    }

}

export default ViewPostComponent;