import axios from 'axios'

class VoteDataService {

    getAllVotes(postdId) {
        return axios.get(`${window.API_URL}/vote/${postdId}`)
    }

    changeVote(postId, vote) {
        return axios.post(`${window.API_URL}/vote/${postId}`, vote)
    }

    getMyVote(postId) {
        return axios.get(`${window.API_URL}/vote/${postId}/myvote`)
    }

}

export default new VoteDataService()
