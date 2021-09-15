const initialValue=[]

export const friendsReducer = (state=initialValue,action) => {
  switch (action.type) {
    case "UPDATE_FRIENDS":
      return action.payload

    case "ADD_FRIEND":
      return [...state,action.payload]
    
    default:
      return state;
  }
}