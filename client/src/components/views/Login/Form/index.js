import React from "react";

const Form = props => {
  const { onHandleChange, onHandleSubmit, data } = props;
  const { email, password, emailError, passwordError } = data;
  return (
    <form>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={onHandleChange}
        />
        {emailError ? (
          <h4 className="form-text text-danger">
            Please check email format
          </h4>
        ) : (
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        )}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onHandleChange}
        />
        {passwordError ? (
          <h4 className="form-text text-danger">
            password cannot be empty
          </h4>
        ) : (
          null
        )}
      </div>
      <button
        onClick={onHandleSubmit}
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
