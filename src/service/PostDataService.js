import axios from 'axios'

class PostDataService {

    retrieveAllPosts(businessName, boardId) {
        //console.log('executed service')
        return axios.get(`${window.API_URL}/business/${businessName}/board/${boardId}/post`,
            //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
        );
    }

    deletePost(businessName, boardId, postId) {
        //console.log('executed service')
        return axios.delete(`${window.API_URL}/business/${businessName}/board/${boardId}/post/${postId}`);
    }

    retrievePost(businessName, boardId, postId) {
        return axios.get(`${window.API_URL}/business/${businessName}/board/${boardId}/post/${postId}`);
    }

    updatePost(businessName, boardId, postId, post) {
        return axios.put(`${window.API_URL}/business/${businessName}/board/${boardId}/post/${postId}`, post);
    }

    createPost(businessName, boardId, post) {
        return axios.post(`${window.API_URL}/business/${businessName}/board/${boardId}/post`, post);
    }
}

export default new PostDataService()