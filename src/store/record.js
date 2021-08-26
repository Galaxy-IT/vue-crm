import firebase from "firebase";

export default{
    state:{

    },
    mutations:{

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
        async fetchRecords(){

        }
    },
    getters:{

    },


}