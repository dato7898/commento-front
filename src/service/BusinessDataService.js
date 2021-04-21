import axios from 'axios';

class BusinessDataService {

    deleteBusiness(businessId) {
        return axios.delete(`${window.API_URL}/business/${businessId}`);
    }

    retrieveBusiness(businessId) {
        return axios.get(`${window.API_URL}/business/${businessId}`);
    }

    createBusiness(business) {
        return axios.post(`${window.API_URL}/business`, business);
    }

}

export default new BusinessDataService();