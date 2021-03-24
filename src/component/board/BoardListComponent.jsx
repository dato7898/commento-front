import React, { Component } from 'react';
import BoardDataService from '../../service/BoardDataService';

class BoardListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            businessId: this.props.match.params.businessId,
            boards: [],
            message: null
        };
        this.refreshBoards = this.refreshBoards.bind(this);
        this.updateBoardClicked = this.updateBoardClicked.bind(this);
        this.deleteBoardClicked = this.deleteBoardClicked.bind(this);
        this.addBoardClicked = this.addBoardClicked.bind(this);
        this.goHome = this.goHome.bind(this);
        this.getBoardClicked = this.getBoardClicked.bind(this);
    }

    componentDidMount() {
        this.refreshBoards();
    }

    refreshBoards() {
        BoardDataService.retrieveAllBoards(this.state.businessId)
            .then(
                response => {
                    console.log(response);
                    this.setState({ boards: response.data });
                }
            )
    }

    deleteBoardClicked(id) {
        BoardDataService.deleteBoard(id)
            .then(() => {
                this.setState({ message: `Delete of board ${id} Successful` });
                this.refreshBoards();
            });
    
    }

    updateBoardClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/business/${this.state.businessId}/board/${id}`);
    }

    addBoardClicked() {
        this.props.history.push(`/business/${this.state.businessId}/board/new`);
    }

    getBoardClicked(id) {
        this.props.history.push(`/business/${this.state.businessId}/board/${id}/post`);
    }

    goHome() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <h3>All Boards</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Open</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    post =>
                                        <tr key={post.id}>
                                            <td>{post.name}</td>
                                            <td><button className="btn btn-success" onClick={() => this.getBoardClicked(post.id)}>Open</button></td>
                                            <td><button className="btn btn-success" onClick={() => this.updateBoardClicked(post.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteBoardClicked(post.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addBoardClicked}>Add</button>
                        <button className="btn btn-success" onClick={this.goHome}>Home</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default BoardListComponent;