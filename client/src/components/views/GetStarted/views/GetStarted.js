import React, { Fragment } from "react";

const Getstarted = props => {
  const { onHandleUnshorten, onHandleChange, value } = props;
  return (
    <Fragment>
      <div className="container" style={{ marginTop: "15em" }}>
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                Shortened Code
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="hash"
              value={value.hash}
              onChange={onHandleChange}
            />
            <div className="input-group-append">
              <button
                onClick={onHandleUnshorten}
                className="btn btn-primary"
                type="button"
              >
                Unshort
              </button>
            </div>
          </div>
        </form>
        {value.hashError ? (
          <small className="form-text text-danger">
            Please enter an short code format
          </small>
        ) : null}
      </div>
    </Fragment>
  );
};
export default Getstarted;
