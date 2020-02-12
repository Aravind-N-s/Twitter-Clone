import { urlAxios } from "../../../../utils/axios";
export const startAddURL = () => {
  return dispatch => {
    urlAxios
      .get("shortservices/chartAllURL", {
        headers: {
          Authorization: `${localStorage.getItem("userAuthToken")}`
        }
      })
      .then(response => {
        if (response.data.hasOwnProperty("errors")) {
          alert(response.data.message);
        } else {
          dispatch(addURL(response.data.shortenedURLs));
        }
      })
      .catch(err => {
        alert(err);
      });
  };
};

export const addURL = data => {
  return {
    type: "SET_URL",
    payload: data
  };
};

export const resetURL = () => {
  return { type: "RESET_URL" };
};
