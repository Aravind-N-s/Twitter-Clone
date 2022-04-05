import React, { Component, Fragment } from "react";
import { authAxios } from "../../utils/axios";
import Form from "./Form";
import Swal from "sweetalert2";
import { Header } from "../../utils/header";
import { isValid } from "../../utils/service";
import { withRouter } from "react-router-dom";
class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      usernameError: "",
      emailError: "",
      passwordError: "",
    };
  }

  handleChange = (e) => {
    e.persist();
    this.setState(() => ({ [e.target.name]: e.target.value }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    const emailError = isValid("email", email);
    const passwordError = isValid("fields", password);
    const usernameError = isValid("fields", username);
    this.setState({
      emailError,
      passwordError,
      usernameError,
    });
    const formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    if (usernameError || emailError || passwordError) return;
    authAxios
      .post(`/user/register`, formData)
      .then((response) => {
        if (response.data.errors) {
          alert(response.data.errors);
        } else {
          Swal.fire("Please Login");
          this.props.history.push("/users/login");
        }
      })
      .catch((err) => {
        const { errors } = err.response.data;
        if (errors) {
          Swal.fire("Email Is Already Registered with us please Login");
          this.props.history.push("/users/login");
        } else {
          Swal.fire(err);
        }
      });
  };
  render() {
    return (
      <Fragment>
        <Header
          name={"Register"}
          handleBlur={() => this.props.history.push("/users/login")}
          context={this}
        />
        <div
          className="container"
          style={{ padding: "20%", marginTop: "-15%" }}
        >
          <Form
            onHandleSubmit={this.handleSubmit}
            onHandleChange={this.handleChange}
            data={this.state}
          />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(RegisterContainer);
