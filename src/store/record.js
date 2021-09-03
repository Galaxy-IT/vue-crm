import firebase from "firebase";

export default{
    state:{
records:[],
    },
    mutations:{
        setRecords(state,records){
            
            state.records = records
           
        },
    },
    actions:{
        async createRecord({dispatch,commit},record){
            try{
                const uid = await dispatch('getID')
                return await firebase.database().ref(`/users/${uid}/records`).push(record)
            }
            catch(e){
                commit('setError',e)
                throw e
            }

        },
        async fetchRecords({dispatch,commit}){
            try{
                // const uid = await dispatch('getID')
                // const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val()
                // commit('setRecords',records)

                const id = await dispatch('getID')
                const records = (await firebase.database().ref(`/users/${id}/records`).once('value')).val() || {}
                return Object.keys(records).map(key => ({...records[key],id:key}))
            }
            catch(e){
                commit('setError',e)
                throw e
            }
            
        }
    },
    getters:{
        records:state => state.records
    },


}