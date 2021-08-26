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
    },
     async fetchCategories({commit,dispatch}){
        try{
            const id = await dispatch('getID')
            const categories = (await firebase.database().ref(`/users/${id}/categories`).once('value')).val() || {}
            return Object.keys(categories).map(key => ({...categories[key],id:key}))
        }
        catch(e){
            throw e
        }
     },
       async updateCategory({commit,dispatch},{categoryName,limit,id}){
           try{
               let uid = await dispatch('getID')
               await firebase.database().ref(`/users/${uid}/categories`).child(id).update({categoryName, limit})
           }
           catch(e){
               commit('setError',e)
               throw e
           }
       },
  }
}