import Vue from 'vue'
import Vuex from 'vuex'
// import CryptoJS from 'crypto-js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    loa_log_in: "",
    loa_user: "",
    loa_user_rights: {},
    ref: "",
    // Releave: "",
    // LeaveCredit: "",
    // LeaveUsed: "",
  },

  mutations:{
    CHANGE_LOA_LOGIN:(state, data) => {
      state.loa_log_in = data
    },
    CHANGE_LOA_USER:(state, data) => {
      state.loa_user = data
    },
    CHANGE_LOA_USERRIGHTS:(state, data) => {
      state.loa_user_rights = data
    },
    CHANGE_REF:(state, data) => {
      state.ref = data
    },
    // CHANGE_RELEAVE:(state, data) => {
    //   state.Releave = data
    // },
    // CHANGE_LEAVECREDITS:(state, data) => {
    //   state.LeaveCredit = data
    // },
    // CHANGE_LEAVEUSED:(state, data) => {
    //   state.LeaveUsed = data
    // },
  },

  actions:{},

  modules:{},
  
  plugins:[
    createPersistedState()
  ]
})