import axios from 'axios';

class UserDataService {

    updateUser(user) {
        return axios.put(`${window.API_URL}/user`, user);
    }

}

export default new UserDataService();
