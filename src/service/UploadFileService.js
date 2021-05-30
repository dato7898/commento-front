import axios from 'axios'

class UploadFileService {

    uploadFile(formData) {
        return axios.post(`${window.API_URL}/uploadfile`, formData)
    }

    uploadFavicon(formData, businessName) {
        return axios.post(`${window.API_URL}/uploadfavicon/${businessName}`, formData)
    }

    loadImage() {
        return axios.get(`${window.API_URL}/loadimage`, {
            responseType: 'arraybuffer'
        });
    }

    loadFavicon(businessName) {
        return axios.get(`${window.API_URL}/loadfavicon/${businessName}`, {
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