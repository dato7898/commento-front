import React, { Component } from 'react';
import './App.css';
import CommentoApp from './component/CommentoApp';
import BusinessDataService from './service/BusinessDataService';
import UploadService from './service/UploadFileService';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      businessId: window.location.host.split('.')[0]
    };

    this.retrieveBusiness = this.retrieveBusiness.bind(this);
    this.loadFavicon = this.loadFavicon.bind(this);
  }

  componentDidMount() {
   this.retrieveBusiness()
  }

  retrieveBusiness() {
    BusinessDataService.retrieveBusiness(this.state.businessId)
    .then(res => {
      if (res.data && res.data.id) {
        this.setState({ businessExist: true });
        window.businessId = res.data.id
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
    UploadService.loadFavicon(window.businessId)
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
        {this.state.businessExist ?
          <CommentoApp /> : 
          <>{this.state.noBusiness}</>
        }
      </div>
    );
  }
}

export default App;