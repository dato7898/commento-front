import React, { Component } from 'react';
import CommentVoteDataService from '../../service/CommentVoteDataService';
import { isUserLoggedIn } from '../../service/AuthenticationService';

class CommentComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myvote: undefined,
            commentId: this.props.commentId,
            likes: 0,
            dislikes: 0
        }
        
        this.onVoteChange = this.onVoteChange.bind(this);
        this.getMytVote = this.getMyVote.bind(this);
    }

    componentDidMount() {
        this.getAllVotes();
        if (isUserLoggedIn()) {
            this.getMyVote();
        }
    }

    getAllVotes() {
        CommentVoteDataService.getAllVotes(this.state.commentId)
            .then(response => this.setState({
                likes: response.data.true,
                dislikes: response.data.false
            }));
    }

    getMyVote() {
        CommentVoteDataService.getMyVote(this.state.commentId)
            .then(response => this.setState({
                myvote: response.data.up
            }));
    }

    onVoteChange(up) {
        CommentVoteDataService.changeVote(this.state.commentId, { "up": up })
            .then(() => {
                this.getAllVotes();
                this.getMyVote();
            });
    }

    render() {

        let { myvote, likes, dislikes } = this.state;

        return (
            <>
            <div>
                <button className={"btn" + (myvote === true ? " btn-primary" : "")} onClick={() => this.onVoteChange(true)}>Like</button>
                <label>{likes}</label>
            </div>
            <div>
                <button className={"btn" + (myvote === false ? " btn-danger" : "")} onClick={() => this.onVoteChange(false)}>Dislike</button>
                <label>{dislikes}</label>
            </div>
            </>
        )
    }

}

export default CommentComponent;