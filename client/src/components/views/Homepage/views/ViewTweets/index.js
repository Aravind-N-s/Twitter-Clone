import React, { Fragment, Component } from "react";

const ViewTweet = props => {
  const { tweets, onHandlePagination, page } = props;
  let pageValue = page*10
  const newTweet = tweets.filter((value, index) => {return index < pageValue+10 })
  return (
    <div style={{ padding: "1%" }}>
      {newTweet.length == 0 ? (
        <h4 style={{padding: "25%"}}>Create A Search Request</h4>
      ) : (
        <div>
          {newTweet.map(x => {
            return (
              <div key={x.id} className="card" style={{marginBottom: "2%" }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "blue" }}>
                    {x.user.name}
                  </h5>
                </div>
                <div style={{ padding: "1%" }}>
                  <p className="card-text">{x.text}</p>
                </div>
              </div>
            );
          })}
          <div>
            <button style={{width: '100%'}} disabled={page === 9} name="false" onClick={onHandlePagination}>
              Load More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTweet;
