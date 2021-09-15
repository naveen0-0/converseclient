import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { friendsReducer } from './friendsReducer'
import { selectedFriendReducer } from './selectedfriendReducer'

export const rootReducer = combineReducers({
  user : userReducer,
  friends : friendsReducer,
  selectedFriend : selectedFriendReducer
})