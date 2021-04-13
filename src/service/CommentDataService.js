import axios from 'axios'

class CommentDataService {

    retrieveAllComments(postId) {
        return axios.get(`${window.API_URL}/post/${postId}/comment`);
    }

    deleteComment(commentId) {
        return axios.delete(`${window.API_URL}/comment/${commentId}`);
    }

    updateComment(commentId, comment) {
        return axios.put(`${window.API_URL}/comment/${commentId}`, comment);
    }

    createComment(postId, comment) {
        return axios.post(`${window.API_URL}/post/${postId}/comment`, comment);
    }

}

export default new CommentDataService()