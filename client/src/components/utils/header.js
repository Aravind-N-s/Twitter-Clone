import React from "react";

export const Header = props => {
  const token = localStorage.getItem("userAuthToken");
  return (
    <div
      className="card-header"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      {token ? (
        <div className="container">
          {props.name == "HomePage" ? (
            <div className="row">
              <h1 className="col-md-4">{props.name}</h1>
              <div className="col-md-4 ml-auto">
                <button
                  onClick={() => {
                    props.logout();
                  }}
                >
                  LogOut
                </button>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md md-auto">
                <button
                  onClick={() => {
                    props.context.props.history.goBack();
                  }}
                >
                  Go Back
                </button>
              </div>
              <div className=".offset-md-3">{props.name}</div>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {props.name !== "Login" ? (
                <button
                  onClick={() => {
                    props.context.props.history.goBack();
                  }}
                >
                  Go Back
                </button>
              ) : (
                <div></div>
              )}
            </div>
            <div className="col-md-4">{props.name}</div>
            <div className="col-md-4">
              {props.name !== "Login" ? (
                null
              ) : (
                <button className="col-md-4" onClick={props.handleBlur}>
                  Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
