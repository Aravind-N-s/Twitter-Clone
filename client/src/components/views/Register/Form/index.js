import React from "react";

const Form = props => {
  const {onHandleChange, onHandleSubmit, data} = props
  const {username,email, password,usernameError,emailError, passwordError} = data
  return (
    <form>
      <div className="form-group">
      <label>User Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter email"
          name="username"
          value={username} 
          onChange={onHandleChange}
        />
        {usernameError ? (
          <h4 className="form-text text-danger">
            User Name cannot be Empty
          </h4>
        ) : (
          <br></br>
        )}
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
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
          placeholder="Password"
          name="password"
          value={password} 
          onChange={onHandleChange}
        />
        {passwordError ? (
          <h4 className="form-text text-danger">
            Password cannot be empty
          </h4>
        ) : (
          null
        )}
      </div>
      <button onClick={onHandleSubmit} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form