import React, { Component } from 'react';
import Cookies from 'js-cookie';
import BoardDataService from '../../service/BoardDataService';
import BusinessDataService from '../../service/BusinessDataService';

class BoardListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            businessName: this.props.match.params.businessName,
            userId: Cookies.get(window.USER_ID),
            boards: [],
            message: null,
            isBusinessOwner: false
        };
        this.refreshBoards = this.refreshBoards.bind(this);
        this.updateBoardClicked = this.updateBoardClicked.bind(this);
        this.deleteBoardClicked = this.deleteBoardClicked.bind(this);
        this.addBoardClicked = this.addBoardClicked.bind(this);
        this.goHome = this.goHome.bind(this);
        this.getBoardClicked = this.getBoardClicked.bind(this);
    }

    componentDidMount() {
        this.checkBusinessOwner();
        this.refreshBoards();
    }

    refreshBoards() {
        BoardDataService.retrieveAllBoards(this.state.businessName)
            .then(
                response => {
                    console.log(response);
                    this.setState({ boards: response.data });
                }
            )
    }

    checkBusinessOwner() {
        BusinessDataService.retrieveBusiness(this.state.businessName)
            .then(
                response => {
                    this.setState({ isBusinessOwner: response.data.author.id == this.state.userId });
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
        this.props.history.push(`/business/${this.state.businessName}/board/${id}/edit`);
    }

    addBoardClicked() {
        this.props.history.push(`/business/${this.state.businessName}/board/new/edit`);
    }

    getBoardClicked(id) {
        this.props.history.push(`/business/${this.state.businessName}/board/${id}/post`);
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
                                    board =>
                                        <tr key={board.id}>
                                            <td>{board.name}</td>
                                            <td><button className="btn btn-success" onClick={() => this.getBoardClicked(board.id)}>Open</button></td>
                                            {this.state.isBusinessOwner &&
                                                <>
                                                    <td><button className="btn btn-success" onClick={() => this.updateBoardClicked(board.id)}>Update</button></td>
                                                    <td><button className="btn btn-warning" onClick={() => this.deleteBoardClicked(board.id)}>Delete</button></td>
                                                </>
                                            }
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        {this.state.isBusinessOwner && 
                            <button className="btn btn-success" onClick={this.addBoardClicked}>Add</button>
                        }
                        <button className="btn btn-success" onClick={this.goHome}>Home</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default BoardListComponent;