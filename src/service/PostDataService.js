import axios from 'axios'

class PostDataService {

    retrieveAllPosts(businessId, boardId) {
        //console.log('executed service')
        return axios.get(`${window.API_URL}/business/${businessId}/board/${boardId}/post`,
            //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
        );
    }

    deletePost(businessId, boardId, postId) {
        return axios.delete(`${window.API_URL}/business/${businessId}/board/${boardId}/post/${postId}`);
    }

    retrievePost(businessId, boardId, postId) {
        return axios.get(`${window.API_URL}/business/${businessId}/board/${boardId}/post/${postId}`);
    }

    updatePost(businessId, boardId, postId, post) {
        return axios.put(`${window.API_URL}/business/${businessId}/board/${boardId}/post/${postId}`, post);
    }

    createPost(businessId, boardId, post) {
        return axios.post(`${window.API_URL}/business/${businessId}/board/${boardId}/post`, post);
    }

    postExist(businessId, boardId, postTitle) {
        return axios.get(`${window.API_URL}/business/${businessId}/board/${boardId}/postexist?title=${postTitle}`);
    }

}

export default new PostDataService()