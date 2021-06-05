import axios from 'axios'

class WorkplaceDataService {

    retrieveAllWorkplaces(spaceId) {
        return axios.get(`${window.API_URL}/space/${spaceId}/workplace`);
    }

}

export default new WorkplaceDataService();