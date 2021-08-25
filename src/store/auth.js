/* eslint-disable */

import firebase from 'firebase/app'


export default {
  actions: { 
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError',e)
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name}){
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const id = await dispatch('getID')
        await firebase.database().ref(`/users/${id}/info`).set({
          bill:100000,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getID(){
      let user = firebase.auth().currentUser
      return user ?user.uid:null
    },
    async logout(){
        await firebase.auth().signOut()
        commit('clearInfo')
    }
  }
}
// {dispatch,commit},