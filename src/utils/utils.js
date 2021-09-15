export const makeAUserFriend = (friends,chatId) => {
  console.log(friends);
  console.log(chatId);
  let updatedFriends = friends.map((friend) => {
    if(friend.chatId === chatId){
      friend.requestAccepted = true
      return friend
    }
    return friend
  })
  console.log(updatedFriends);
  return updatedFriends
}

// export const dispatchEditBlog = (blogs,id,data) => {
//   let updatedBlogs = blogs.map((blog)=>{
//       if(blog._id ===id ){
//           blog.title = data.title
//           blog.description = data.description,
//           blog.keywordone = data.keywordone
//           blog.keywordtwo = data.keywordtwo
//           blog.keywordthree = data.keywordthree
//           blog.url = data.url
//           return blog
//       }
//       return blog
//   })
//   return updatedBlogs
// }

export const addMsg = (friends, chatId) => {
  console.log("Msg Updated");
}