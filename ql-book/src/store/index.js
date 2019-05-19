import Vue from 'vue'
import Vuex from 'vuex'
import {fetch} from '@/utils/index'
import api from '@/utils/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)// 装载vuex

const store = new Vuex.Store({
	state: {
    usermsg: {},
    findList: []
	},
	mutations: {
		'CHANGE_USER_MSG' (state, usermsg) {
			state.usermsg = usermsg
		},
		// 'FIND_BOOK_LIST' (state, findList) {
		// 	state.findList = findList
		// }
	},
	actions: {
		getusermsg (context) { // context是一个对象
      return new Promise((resolve) => {
        fetch.get(api.getuser).then(res => {
          if(res.code == 200) {
            this.usermsg = res.data
            context.commit('CHANGE_USER_MSG', res.data)
            resolve(res)
          }
        })
      })
    },
		// findBook (title) {
    //   console.log(title)
    //   return new Promise((resolve) => {
    //     fetch.post(api.findBook,{
		// 			titlemsg: title
		// 		}).then(res => {
    //       if(res.code == 200) {
    //         this.findList = [...this.findList,...res.data]
    //         title.commit('CHANGE_USER_MSG', res.data)
    //         resolve(res)
    //       }
    //     })
    //   })
    // }
  },
  // plugins:[
  //   function(){
  //     console.log('哈哈哈')
  //   }
  // ],
	plugins: [
    createPersistedState({
      localStorage: {
        getItem: key => localStorage.get(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
        localStorage.set(key, value, { expires: 3, secure: true }),
        removeItem: key => localStorage.remove(key),
      },
    })
  ]
})

export default store