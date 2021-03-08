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

    retrievePost(id) {
        return axios.get(`${window.API_URL}/business/1/post/${id}`);
    }

    updatePost(id, post) {
        return axios.put(`${window.API_URL}/business/1/post/${id}`, post);
    }

    createPost(post) {
        return axios.post(`${window.API_URL}/business/1/post`, post);
    }

    retrievePost(id) {
        return axios.get(`${window.API_URL}/business/1/post/${id}`);
    }
}

export default new PostDataService()