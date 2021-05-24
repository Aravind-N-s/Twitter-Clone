import React, { Fragment, Component } from "react";

const SearchField = props => {
  const { onHandleChange, onHandleSubmit, state } = props;
  return (
    <form style={{borderStyle: 'solid', borderColor: 'blue', padding:'5%', marginTop: '2%'}}>
      <div className="form-group">
        <label>Enter The Search Text Here</label>
        <input
          className="form-control"
          value={state.searchData}
          name="searchData"
          onChange={onHandleChange}
        />
        {state.searchDataError && 
            <small style={{color:'red'}}>Please Enter Some Data</small>
        }
      </div>
      <button className="btn btn-primary" onClick={onHandleSubmit} style={{width: '100%'}}>
        Search
      </button>
    </form>
  );
};

export default SearchField;
