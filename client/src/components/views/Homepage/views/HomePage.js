import React, { Fragment, Component } from "react";
import { isValid } from "../../../utils/service";
import SearchField from "./CreateSearchRequest";
import ViewTweet from "./ViewTweets";
import io from "socket.io-client";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { startAddTweets, updateTweets } from "../redux/action";
import { CHAT_SERVICES } from "../../../utils/urls";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: "",
      searchDataError: "",
      pageNumber: 0,
      prevSearch: ""
    };
  }

  componentDidMount() {
    const {dispatch} = this.props
    const socket = io(CHAT_SERVICES);
    socket.on("event", event => {
      if (event) {
        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: "bottom-left",
        //   showConfirmButton: false,
        //   timer: 1500,
        //   onOpen: toast => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   }
        // });

        // Toast.fire({
        //   icon: "info",
        //   title: "New Tweet Available"
        // });
        alert("NEW REQ")
      }
      dispatch(updateTweets(event))
    });
    socket.on("err", error => {
      if (error) {
        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: "bottom-left",
        //   showConfirmButton: false,
        //   timer: 1500,
        //   onOpen: toast => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   }
        // });

        // Toast.fire({
        //   icon: "error",
        //   title: "Too Many Requests"
        // });
        alert('err')
      }
    });
  }
  handlePagination = e => {
    const { name } = e.target;
    const { dispatch } = this.props;
    const { prevSearch } = this.state;
    if (name === "false") {
      this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
    } else {
      dispatch(startAddTweets(prevSearch));
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
    this.setState(prevState => ({
      prevSearch: prevState.searchData,
      searchData: ""
    }));
  };

  render() {
    const { tweets } = this.props;
    const { pageNumber } = this.state;
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
