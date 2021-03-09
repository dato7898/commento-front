import React, { Component } from 'react';
import PostDataService from '../service/PostDataService';

class ListPostComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            message: null
        };
        this.refreshPosts = this.refreshPosts.bind(this);
        this.updatePostClicked = this.updatePostClicked.bind(this);
        this.deletePostClicked = this.deletePostClicked.bind(this);
        this.addPostClicked = this.addPostClicked.bind(this);
        this.goHome = this.goHome.bind(this);
        this.getPostClicked = this.getPostClicked.bind(this);
    }

    componentDidMount() {
        this.refreshPosts();
    }

    refreshPosts() {
        PostDataService.retrieveAllPosts(this.props.match.params.businessName, this.props.match.params.boardId)
            .then(
                response => {
                    console.log(response);
                    this.setState({ posts: response.data });
                }
            )
    }

    deletePostClicked(id) {
        PostDataService.deletePost(this.props.match.params.businessName, this.props.match.params.boardId, id)
            .then(() => {
                this.setState({ message: `Delete of post ${id} Successful` });
                this.refreshPosts();
            });
    
    }

    updatePostClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/business/${this.props.match.params.businessName}/board/${this.props.match.params.boardId}/post/${id}`);
    }

    addPostClicked() {
        this.props.history.push(`/business/${this.props.match.params.businessName}/board/${this.props.match.params.boardId}/post/new`);
    }

    getPostClicked(id) {
        this.props.history.push(`/business/${this.props.match.params.businessName}/board/${this.props.match.params.boardId}/post/${id}`);
    }

    goHome() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <h3>All Posts</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Open</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.posts.map(
                                    post =>
                                        <tr key={post.id}>
                                            <td>{post.title}</td>
                                            <td>{post.details}</td>
                                            <td><button className="btn btn-success" onClick={() => this.getPostClicked(post.id)}>Open</button></td>
                                            <td><button className="btn btn-success" onClick={() => this.updatePostClicked(post.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deletePostClicked(post.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addPostClicked}>Add</button>
                        <button className="btn btn-success" onClick={this.goHome}>Home</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListPostComponent;