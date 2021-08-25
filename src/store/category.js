/* eslint-disable */
import firebase from "firebase"

export default{
   actions:{
    async createCategory({commit,dispatch},{categoryName,limit}){
      try{
        let id = await dispatch('getID')
        let category =  await firebase.database().ref(`/users/${id}/categories`).push({categoryName,limit})
        return {
          categoryName,
          limit,
          id:category.key
        }
        
      }
      catch(e){
        commit('setError',e)
        throw e
      }
    }
  }
}