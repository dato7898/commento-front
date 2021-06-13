import Cookies from 'js-cookie';
import React, { Component } from 'react';
import './App.css';
import CommentoApp from './component/CommentoApp';
import BusinessDataService from './service/BusinessDataService';
import UploadService from './service/UploadFileService';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      businessName: window.location.host.split('.')[0]
    };

    this.retrieveBusiness = this.retrieveBusiness.bind(this);
    this.loadFavicon = this.loadFavicon.bind(this);
  }

  componentDidMount() {
   this.retrieveBusiness();
  }

  retrieveBusiness() {
    BusinessDataService.retrieveBusiness(this.state.businessName)
    .then(res => {
      if (res.data && res.data.name) {
        this.setState({ businessExist: true });
        window.businessName = res.data.name
        const userId = Cookies.get(window.USER_ID);
        Cookies.set(window.BUSINESS_OWNER, userId == res.data.author.id);
        this.loadFavicon();
      } else {
        this.setState({ noBusiness: "Такой компании не существует" })
      }
    })
    .catch(err => {
      this.setState({ noBusiness: "Такой компании не существует" })
    });
  }

  loadFavicon() {
    UploadService.loadFavicon(window.businessName)
      .then(response => {
        const base64 = UploadService.convertToBase64(response.data);
        if (base64) {
          document.getElementById("favicon").href = "data:;base64," + base64;
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
          <CommentoApp />
      </div>
    );
  }
}

export default App;