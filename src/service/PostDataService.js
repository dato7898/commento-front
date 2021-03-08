import axios from 'axios'

class PostDataService {

    retrieveAllPosts(name) {
        //console.log('executed service')
        return axios.get(`${window.API_URL}/business/1/post`,
            //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
        );
    }

    deletePost(id) {
        //console.log('executed service')
        return axios.delete(`${window.API_URL}/business/1/post/${id}`);
    }

    retrievePost(businessName, postId) {
        return axios.get(`${window.API_URL}/business/${businessName}/post/${postId}`);
    }

    updatePost(businessName, postId, post) {
        return axios.put(`${window.API_URL}/business/${businessName}/post/${postId}`, post);
    }

    createPost(businessName, post) {
        return axios.post(`${window.API_URL}/business/${businessName}/post`, post);
    }
}

export default new PostDataService()