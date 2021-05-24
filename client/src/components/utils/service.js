export const isValid = (field, value) => {
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  switch (field) {
    case "fields": {
      return value.trim() === "";
    }
    case "email": {
      if (emailReg.test(value) === true) {
        return value.trim() === "";
      } else {
        return true;                                       
      }
    }
    default : {return true}
  }
};