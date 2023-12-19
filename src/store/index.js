import { createStore } from 'vuex'

export default createStore({
  state() {
    let JSESSION = window.sessionStorage.getItem("JSESSIONID")
    return {
      JSESSIONID:JSESSION,
    }
  },
  mutations: {
    changeMessage(state, JSESSIONID) {
      window.sessionStorage.setItem("JSESSIONID",JSESSIONID) ;
      state.JSESSIONID=JSESSIONID
    },
  }
})
