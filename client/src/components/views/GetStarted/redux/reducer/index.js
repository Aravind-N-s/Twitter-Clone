const userReducer = (state = {'loggedIn':false}, action) => {
  switch (action.type) {
    case "SET_USER": {
      return { 'loggedIn': true, ...action.payload };
    }
    case "SET_TOKEN":{
      return {
        'loggedIn': true
      }
    }
    case "RESET_USER": {
      return {};
    }
    default:
      return { ...state };
  }
};

export default userReducer;
