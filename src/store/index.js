import { createStore } from 'vuex'

export default createStore({
  state() {
    let JSESSIONID = window.sessionStorage.getItem("JSESSIONID")
    return {
      JSESSIONID,
    }
  },
  mutations: {
    changeMessage(state, JSESSIONID) {
      window.sessionStorage.setItem("JSESSIONID",JSESSIONID) ;
    },
  }
})
