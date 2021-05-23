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

    convertToBase64(img) {
        if (img && img.byteLength) {
            return Buffer.from(img, 'binary').toString('base64');
        }
    }

}

export default new UploadFileService()