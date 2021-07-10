import axios from 'axios'

class SpaceDataService {

    retrieveAllSpaces(businessName) {
        return axios.get(`${window.API_URL}/business/${businessName}/space`);
    }

    sendMailing(mail, businessName, spaceId) {
        return axios.post(`${window.API_URL}/business/${businessName}/space/${spaceId}/mailing`, mail);
    }

}

export default new SpaceDataService();