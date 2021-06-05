import axios from 'axios'

class SpaceDataService {

    retrieveAllSpaces(businessName) {
        return axios.get(`${window.API_URL}/business/${businessName}/space`);
    }

}

export default new SpaceDataService();