const initialValue=null

export const selectedFriendReducer = (state=initialValue,action) => {
  switch (action.type) {
    case "UPDATE_SELECTED_FRIEND":
      return action.payload
    
    default:
      return state;
  }
}