import React, { Fragment, Component } from "react";
import { isValid } from "../../../utils/service";
import SearchField from "./CreateSearchRequest";
import ViewTweet from "./ViewTweets";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: "",
      searchDataError: "",
      receivedData: ["data1", "data2"]
    };
  }

  handleChange = e => {
    e.persist();
    this.setState(() => ({ [e.target.name]: e.target.value }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchData } = this.state;
    const searchDataError = isValid("fields", searchData);
    this.setState({
      searchDataError
    });
    const formData = {
      email: this.state.email,
      password: this.state.password
    };
    if (searchDataError) return;
  };

  render() {
    return (
      <Fragment>
        <div className="flex-container">
          <div>
            <SearchField
              state={this.state}
              onHandleChange={this.handleChange}
              onHandleSubmit={this.handleSubmit}
            />
          </div>
          <div>
            <ViewTweet state={this.state} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
