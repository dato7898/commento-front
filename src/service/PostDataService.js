import axios from 'axios'

class PostDataService {

    retrieveAllPosts(businessName, boardId) {
        //console.log('executed service')
        return axios.get(`${window.API_URL}/business/${businessName}/board/${boardId}/post`,
            //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
        );
    }

    deletePost(businessName, boardId, postId) {
        return axios.delete(`${window.API_URL}/business/${businessName}/board/${boardId}/post/${postId}`);
    }

    retrievePost(businessName, boardId, postId) {
        return axios.get(`${window.API_URL}/business/${businessName}/board/${boardId}/post/${postId}`);
    }

    updatePost(businessName, boardId, postId, post) {
        return axios.put(`${window.API_URL}/business/${businessName}/board/${boardId}/post/${postId}`, post);
    }

    updatePostStatus(businessName, boardId, postId, statusId) {
        return axios.put(`${window.API_URL}/business/${businessName}/board/${boardId}/post/${postId}/status?status=${statusId}`);
    }

    createPost(businessName, boardId, post) {
        return axios.post(`${window.API_URL}/business/${businessName}/board/${boardId}/post`, post);
    }

    postExist(businessName, boardId, postTitle) {
        return axios.get(`${window.API_URL}/business/${businessName}/board/${boardId}/postexist?title=${postTitle}`);
    }

    searchPosts(businessName, boardId, searchQuery) {
        return axios.get(`${window.API_URL}/business/${businessName}/board/${boardId}/postsearch?searchQuery=${searchQuery}`);
    }

}

export default new PostDataService();