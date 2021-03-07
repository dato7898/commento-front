import axios from 'axios'

class PostDataService {

    retrieveAllPosts(name) {
        //console.log('executed service')
        return axios.get(`${window.API_URL}/post`,
            //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
        );
    }

    deletePost(id) {
        //console.log('executed service')
        return axios.delete(`${window.API_URL}/post/${id}`);
    }

    retrievePost(id) {
        return axios.get(`${window.API_URL}/post/${id}`);
    }

    updatePost(id, post) {
        return axios.put(`${window.API_URL}/post/${id}`, post);
    }

    createPost(post) {
        return axios.post(`${window.API_URL}/post/`, post);
    }

    retrievePost(id) {
        return axios.get(`${window.API_URL}/post/${id}`);
    }
}

export default new PostDataService()