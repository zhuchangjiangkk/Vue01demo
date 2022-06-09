import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =new Vuex.Store({
    state:{
        currentPathname:'',

    },
    mutations: {
        setPath(state) {
            state.currentPathname = localStorage.getItem("currenPathName")
        }
    }
})
export default store