import axios from 'axios'

class UploadFileService {

    uploadFile(formData) {
        return axios.post(`${window.API_URL}/uploadfile`, formData)
    }

    loadImage() {
        return axios.get(`${window.API_URL}/loadimage`, {
            responseType: 'arraybuffer'
        });
    }

}

export default new UploadFileService()