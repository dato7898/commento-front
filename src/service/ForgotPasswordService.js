import axios from 'axios';
import Cookies from 'js-cookie';

class ForgotPasswordService {

    sendEmail(email) {
        return axios.post(`${window.API_URL}/forgot_password`, { email });
    }

    resetPassword(password) {
        return axios.post(`${window.API_URL}/reset_password`, { password }, 
            { headers: { 'resetPasswordCode': Cookies.get(window.RESET_PASSWORD_CODE) } }
        )
    }

}

export default new ForgotPasswordService();