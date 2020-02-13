const initialState=[]
const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TWEETS": {
      return [...action.payload];
    }
    case "UPDATE_TWEETS": {
      return [action.payload, ...state]
    }
    case "RESET_TWEETS": {
      return [];
    }
    default:
      return [ ...state ];
  }
};

export default tweetsReducer            ;
