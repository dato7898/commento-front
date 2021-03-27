import axios from 'axios'

class UploadFileService {

    uploadFile(formData) {
        return axios.post(`${window.API_URL}/uploadfile`, formData)
    }

}

export default new UploadFileService()