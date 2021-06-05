import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import ProfileSettingComponent from './ProfileSettingComponent';
import CompanySettingComponent from './CompanySettingComponent';
import SpaceDataService from '../../service/SpaceDataService';
import WorkplaceDataService from '../../service/WorkplaceDataService';
import BoardDataService from '../../service/BoardDataService';
import BoardSettingComponent from './BoardSettingComponent';

class AdminPanelComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            businessName: window.location.host.split('.')[0],
            spaces: [],
            workplaces: [],
            boards: []
        };

        this.spaceSelect = this.spaceSelect.bind(this);
        this.workSelect = this.workSelect.bind(this);
        this.boardSelect = this.boardSelect.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.chooseTab = this.chooseTab.bind(this);
        this.loadSpaces = this.loadSpaces.bind(this);
        this.loadWorkplaces = this.loadWorkplaces.bind(this);
        this.loadBoards = this.loadBoards.bind(this);
        this.onBoardSelect = this.onBoardSelect.bind(this);
        this.loadBoardsBySelectedWorkplace = this.loadBoardsBySelectedWorkplace.bind(this);
    }

    componentDidMount() {
        this.loadSpaces();
    }

    loadSpaces() {
        SpaceDataService.retrieveAllSpaces(this.state.businessName)
            .then(res => this.setState({ spaces: res.data }))
            .catch(error => console.log(error));
    }

    loadWorkplaces(spaceId) {
        WorkplaceDataService.retrieveAllWorkplaces(spaceId)
            .then(res => this.setState({ 
                workplaces: res.data,
                selectedSpace: spaceId
            }))
            .catch(error => console.log(error));
    }

    loadBoards(workplaceId) {
        BoardDataService.retrieveAllBoardsByWorkplace(this.state.businessName, workplaceId)
            .then(res => this.setState({ 
                boards: res.data,
                selectedWorkplace: workplaceId
            }))
            .catch(error => console.log(error));
    }

    loadBoardsBySelectedWorkplace() {
        this.loadBoards(this.state.selectedWorkplace);
        this.setState({ activeTab: 0 });
    }

    onBoardSelect(board) {
        this.setState({ 
            selectedBoard: board,
            activeTab: 3
        });
    }

    spaceSelect() {
        this.setState({ spaceSelect: !this.state.spaceSelect });
    }

    workSelect() {
        this.setState({ workSelect: !this.state.workSelect });
    }

    boardSelect() {
        this.setState({ boardSelect: !this.state.boardSelect });
    }

    switchTab() {
        switch (this.state.activeTab) {
            case 0:
                return <></>
            case 1:
                return <ProfileSettingComponent history={this.props.history} />;
            case 2:
                return <CompanySettingComponent history={this.props.history} />;
            case 3:
                return <BoardSettingComponent 
                    board={this.state.selectedBoard} 
                    refreshBoards={this.loadBoardsBySelectedWorkplace}
                    businessName={this.state.businessName}
                />;
        }
    }

    chooseTab(tabIndex) {
        this.setState({ activeTab: tabIndex });
    }

    render() {

        const { 
            spaces, workplaces, selectedSpace, 
            boards, selectedWorkplace 
        } = this.state;

        return (
            <div className="container admin-panel-wrap">
                <div className="row">
                    <div className="col-md-3">
                        <div className="admin-menu">
                            <span className="head-span">Вы и Компания</span>
                            <span className="admin-panel-section" onClick={() => this.chooseTab(0)}>
                                <img src="./icons/home.svg" alt="home" /> 
                                Home
                            </span>
                            <span className="admin-panel-section" onClick={() => this.chooseTab(1)}>
                                <img src="./icons/profile.svg" alt="profile" /> 
                                Мои данные
                            </span>
                            <span className="admin-panel-section" onClick={() => this.chooseTab(2)}>
                                <img src="./icons/building.svg" alt="building" />
                                Компания
                            </span>
                            <span className="admin-panel-section">
                                <img src="./icons/dollar.svg" alt="dollar" />
                                Тарифы и Счета
                            </span>
                            <hr className="head-hr" />
                            <Accordion onSelect={this.spaceSelect}>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                            {this.state.spaceSelect ? 
                                                <img src="./icons/arrow-up.svg" alt="arrow up" />
                                                : <img src="./icons/arrow-down.svg" alt="arrow down" />
                                            }
                                            <span>Пространства</span>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            {spaces.map(space => (
                                                <span key={space.id} onClick={() => this.loadWorkplaces(space.id)}>{space.name}</span>
                                            ))}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            <hr />
                            {selectedSpace !== undefined && <>
                                <span className="spaces-link data-link">
                                    <img src="./icons/gear.svg" alt="gear" />
                                    Данные пространства
                                </span>
                                <span className="spaces-link admin-link">
                                    <img src="./icons/security.svg" alt="security" />
                                    Админы пространства
                                </span>
                                <Accordion onSelect={this.workSelect}>
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                                {this.state.workSelect ? 
                                                    <img src="./icons/arrow-up.svg" alt="arrow up" />
                                                    : <img src="./icons/arrow-down.svg" alt="arrow down" />
                                                }
                                                <span>Рабочие места пространства</span>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                {workplaces.map(workplace => (
                                                    <span key={workplace.id} onClick={() => this.loadBoards(workplace.id)}>{workplace.name}</span>
                                                ))}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                <hr />
                                {selectedWorkplace !== undefined && <>
                                    <Accordion onSelect={this.boardSelect}>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                                    {this.state.boardSelect ? 
                                                        <img src="./icons/arrow-up.svg" alt="arrow up" />
                                                        : <img src="./icons/arrow-down.svg" alt="arrow down" />
                                                    }
                                                    <span>Доски рабочего места</span>
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    {boards.map(board => (
                                                        <span key={board.id} onClick={() => this.onBoardSelect(board)}>{board.name}</span>
                                                    ))}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                    <hr />
                                </>}
                            </>}
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="admin-dashboard">
                            {this.switchTab()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(AdminPanelComponent);
