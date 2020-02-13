import { authAxios } from "../../../../utils/axios";
export const startAddTweets = data => {
  return dispatch => {
    authAxios
      .post("user/stream",{searchTerm: data},
        {headers: {
          "Authorization": `JWT ${localStorage.getItem("userAuthToken")}`
        }}
        
      )
      .then(response => {
        if (response.data.hasOwnProperty("errors")) {
          alert(response.data.message);
        } else {
          dispatch(resetTweets());
          dispatch(addTweets(response.data.statuses));
        }
      })
      .catch(err => {
        alert(err);
      });
  };
};

export const addTweets = data => {
  return {
    type: "SET_TWEETS",
    payload: data
  };
};

export const updateTweets = data =>{
  return {
    type: "UPDATE_TWEETS",
    payload: data
  }
}
export const resetTweets = () => {
  return { type: "RESET_TWEETS" };
};
