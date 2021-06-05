import axios from 'axios';

class BoardDataService {

    retrieveAllBoards(businessName) {
        return axios.get(`${window.API_URL}/business/${businessName}/board`);
    }

    retrieveAllBoardsByWorkplace(businessName, workplaceId) {
        return axios.get(`${window.API_URL}/business/${businessName}/workplace/${workplaceId}/board`);
    }

    deleteBoard(businessName, boardId) {
        return axios.delete(`${window.API_URL}/business/${businessName}/board/${boardId}`);
    }

    retrieveBoard(businessName, boardId) {
        return axios.get(`${window.API_URL}/business/${businessName}/board/${boardId}`);
    }

    updateBoard(businessName, boardId, board) {
        return axios.put(`${window.API_URL}/business/${businessName}/board/${boardId}`, board);
    }

    createBoard(businessName, board) {
        return axios.post(`${window.API_URL}/business/${businessName}/board`, board);
    }

}

export default new BoardDataService();