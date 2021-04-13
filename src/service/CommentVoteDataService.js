import axios from 'axios'

class CommentVoteDataService {

    getAllVotes(commentId) {
        return axios.get(`${window.API_URL}/commentvote/${commentId}`)
    }

    changeVote(commentId, vote) {
        return axios.post(`${window.API_URL}/commentvote/${commentId}`, vote)
    }

    getMyVote(commentId) {
        return axios.get(`${window.API_URL}/commentvote/${commentId}/myvote`)
    }

}

export default new CommentVoteDataService()