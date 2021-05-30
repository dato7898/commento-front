import axios from 'axios';

class BusinessDataService {

    deleteBusiness(businessName) {
        return axios.delete(`${window.API_URL}/business/${businessName}`);
    }

    retrieveBusiness(businessName) {
        return axios.get(`${window.API_URL}/business/${businessName}`);
    }

    createBusiness(business) {
        return axios.post(`${window.API_URL}/business`, business);
    }

    updateBusiness(business, businessName) {
        return axios.put(`${window.API_URL}/business/${businessName}`, business);
    }

}

export default new BusinessDataService();