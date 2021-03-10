import axios from 'axios';

class BoardDataService {

    retrieveAllBoards(businessId) {
        return axios.get(`${window.API_URL}/business/${businessId}/board`);
    }

    deleteBoard(businessId, boardId) {
        return axios.delete(`${window.API_URL}/business/${businessId}/board/${boardId}`);
    }

    retrieveBoard(businessId, boardId) {
        return axios.get(`${window.API_URL}/business/${businessId}/board/${boardId}`);
    }

    updateBoard(businessId, boardId, board) {
        return axios.put(`${window.API_URL}/business/${businessId}/board/${boardId}`, board);
    }

    createBoard(businessId, board) {
        return axios.post(`${window.API_URL}/business/${businessId}/board`, board);
    }

}

export default new BoardDataService();