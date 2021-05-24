import React, { Fragment, Component } from "react";
import { Header } from "../../utils/header";
import { connect } from "react-redux";
import { resetUser } from "../GetStarted/redux/action";
import HomePage from '../Homepage/views/HomePage'
class HomePageContainer extends Component {
  handleUserLogout = props => {
    const { dispatch } = this.props;
    const logout = window.confirm("Do You Want To Logout");
    if (logout) {
      localStorage.removeItem("userAuthToken");
      dispatch(resetUser());
      this.props.history.push("/users/login");
    }
  };

  render() {
    return (
      <Fragment>
        <Header
          logout={this.handleUserLogout}
          name={"HomePage"}
          context={this}
        />
        <HomePage/>
      </Fragment>
    );
  }
}
export default connect()(HomePageContainer);
