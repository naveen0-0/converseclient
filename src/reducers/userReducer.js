const initialValue = {
  username : "",
  email : "",
  chatId : "",
  loggedIn : false
}

export const userReducer = (state = initialValue,action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return action.payload
  
    default:
      return state;
  }
}