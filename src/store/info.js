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
  },
  getters:{
      qwerty:state =>state.qwerty,
      info:state =>state.info
  }
}