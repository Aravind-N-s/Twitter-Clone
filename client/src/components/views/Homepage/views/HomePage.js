import React, { Fragment, Component } from "react";
import { isValid } from "../../../utils/service";
import SearchField from "./CreateSearchRequest";
import ViewTweet from "./ViewTweets";
import io from "socket.io-client";
import { connect } from "react-redux";
import { startAddTweets } from "../redux/action";
import {CHAT_SERVICES} from '../../../utils/urls'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: "",
      searchDataError: "",
      pageNumber: 0,
      response: []
    };
  }

  componentDidMount() {
    const socket = io(CHAT_SERVICES);
    socket.on("connection", () => {console.log('HEllo')});
  }
  handlePagination = e => {
    const { name } = e.target;
    if (name === "false") {
      this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
    } else {
      this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }));
    }
  };
  handleChange = e => {
    e.persist();
    this.setState(() => ({ [e.target.name]: e.target.value }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { searchData } = this.state;
    const searchDataError = isValid("fields", searchData);
    this.setState({
      searchDataError
    });
    if (searchDataError) return;
    dispatch(startAddTweets(searchData));
    this.setState({ searchData: "" });
  };

  render() {
    const { tweets } = this.props;
    const { pageNumber } = this.state;
    console.log(this.state,'state')
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <SearchField
                state={this.state}
                onHandleChange={this.handleChange}
                onHandleSubmit={this.handleSubmit}
              />
            </div>
            <div className="col-sm-9">
              <ViewTweet
                page={pageNumber}
                tweets={tweets}
                onHandlePagination={this.handlePagination}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    tweets: state.tweets
  };
};
export default connect(mapStateToProps)(HomePage);
