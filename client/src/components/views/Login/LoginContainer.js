import React, { Component, Fragment } from "react";
import { authAxios } from "../../utils/axios";
import { isValid } from "../../utils/service";
import Form from "./Form";
import { connect } from "react-redux";
import { setToken } from "../GetStarted/redux/action";
import { Header } from "../../utils/header";
import Swal from "sweetalert2";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false
    };
  }

  handleChange = e => {
    e.persist();
    this.setState(() => ({ [e.target.name]: e.target.value }));
  };

  handleRegister = () => {
    this.props.history.push("/users/register");
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { email, password } = this.state;
    const emailError = isValid("email", email);
    const passwordError = isValid("fields", password);
    this.setState({
      emailError,
      passwordError
    });
    const formData = {
      email: this.state.email,
      password: this.state.password
    };
    if (emailError || passwordError) return;
    authAxios
      .post(`/user/login`, formData)
      .then(response => {
        if (response.data.errors) {
          alert(response.data.errors);
        } else {
          const token = response.data.token;
          if (token) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              onOpen: toast => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              }
            });

            Toast.fire({
              icon: "success",
              title: "Signed in successfully"
            });
            dispatch(setToken());
            localStorage.setItem("userAuthToken", token);
            // dispatch(startAddURL());
            // alert("Welcome to the App");
            this.props.history.push("/homepage");
          }
        }
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {
    return (
      <Fragment>
        <Header
          name={"Login"}
          handleBlur={this.handleRegister}
          context={this}
        />
        <div className="container" style={{ padding: "20%", marginTop: "-15%" }}>
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

export default connect()(LoginContainer);
