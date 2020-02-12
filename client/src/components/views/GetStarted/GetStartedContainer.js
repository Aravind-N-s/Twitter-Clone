import React, { Component, Fragment } from "react";
import Footer from "../../utils/footer";
import Getstarted from "./views/GetStarted";
import { urlAxios } from "../../utils/axios";
import axios from "axios";
import { Header } from "../../utils/header";
import {isValid} from '../../utils/service'
class GetStartedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      hash: "",
      city: "",
      lat: "",
      lon: "",
      ipType: "",
      query: "",
      hashError:false,
      urlError: false
    };
  }
  componentDidMount() {
    axios
      .get("https://extreme-ip-lookup.com/json")
      .then(response => {
        const { city, lat, lon, ipType, query } = response.data;
        this.setState({ city, lat, lon, ipType, query });
      })
      .catch(err => {
        alert(err.message);
      });
  }
  handleBlur = () => {
    this.props.history.push("/users/login");
  };
  handleChange = e => {
    e.persist();
    this.setState(() => ({ [e.target.name]: e.target.value }));
  };
  handleSubmit = e => {
    e.preventDefault();
    const { url } = this.state;
    const formData = { original_url: this.state.url };
    const urlError = isValid("url", url);
    this.setState({urlError});
    if (urlError) return;
    urlAxios
      .post("/shortservices/shortenURL", formData)
      .then(response => {
        const { data } = response;
        this.setState({ url: "", hash: data.hashed_url, hashed: true });
      })
      .catch(err => {
        alert(err.message);
      });
  };

  handleUnshorten = e => {
    e.preventDefault();
    const { hash, city, lat, lon, query, ipType } = this.state;
    const formData = {
      city,
      ipType,
      hashed_url: hash,
      location: { lat: lat, long: lon },
      ipAddress: query
    };
    const hashError = isValid("fields", hash);
    this.setState({hashError});
    if (hashError) return;
    urlAxios
      .put("/shortservices/unShortenURL", formData)
      .then(response => {
        const { data } = response;
        this.setState({ url: data.original_url, hash: "" });
      })
      .catch(err => {
        alert(err.message);
      });
  };
  render() {
    return (
      <Fragment>
        <Header name={'URL SHORT'} handleBlur={this.handleBlur}/>
        <div>
          <Getstarted
            onHandleUnshorten={this.handleUnshorten}
            onHandleChange={this.handleChange}
            value={this.state}
          />
          <Footer
            onHandleSubmit={this.handleSubmit}
            onHandleChange={this.handleChange}
            value={this.state}
          />
        </div>
      </Fragment>
    );
  }
}

export default GetStartedContainer;
