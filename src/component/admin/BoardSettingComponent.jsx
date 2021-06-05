import React, { Component } from 'react';
import BoardDataService from '../../service/BoardDataService';

class BoardSettingComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.board.name,
            board: props.board,
            hostname: window.location.hostname,
            businessName: this.props.businessName
        }

        this.onNameChange = this.onNameChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onNameChange(e) {
        this.setState({ name: e.target.value });
    }

    onSave() {
        const board = {
            name: this.state.name,
            parentBoardId: this.state.board.parentBoard ? this.state.board.parentBoard.id : null
        }
        BoardDataService.updateBoard(this.state.businessName, this.state.board.id, board)
            .then(() => this.props.refreshBoards())
            .catch(error => console.log(error));
    }

    render() {

        const { name, hostname, board } = this.state;

        return (
            <div className="profile-wrap">
                <div className="profile-head">
                    Board Settings
                </div>
                <hr />
                <div className="board-setting-header">Naming</div>
                <div className="form-wrap">
                    <div className="input-wrap">
                        <span>Name</span><br />
                        <input value={name} onChange={this.onNameChange} />
                    </div>
                    <div className="input-wrap">
                        <span>URL</span><br />
                        <input value={`${hostname}/board/${board.id}`} readOnly />
                    </div>
                    <div className="save-btn" onClick={this.onSave}>
                        Save
                    </div>
                </div>
            </div>
        );
    }

}

export default BoardSettingComponent;
