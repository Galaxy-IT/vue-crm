/* eslint-disable */
import firebase from "firebase"
export default{
  state:{
    info:{},
    
  },
  mutations:{
    setInfo(state,info){
      state.info = info
    },
    clearInfo(state){
    state.info = {}
    },
    
    
  },
  actions:{
    async fetchInfo({dispatch,commit}){
      try{
        const uid = await dispatch('getID')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo',info)
      }
      catch(e){
        throw e
      }
     
    }
    ,
    async updateInfo({dispatch,commit,getters},toUpdate){
      try{
        const uid = await dispatch('getID')
        const updateData = {...getters.info, ...toUpdate}
        await firebase.database().ref(`/users/${uid}/info`).update(toUpdate)
        commit('setInfo',updateData)
      }
      catch(e){
        commit('setError',e)
        throw e
      }
    }
  },
  getters:{
      qwerty:state =>state.qwerty,
      info:state =>state.info
  }
}