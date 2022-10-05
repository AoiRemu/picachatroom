import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:{
      avatar:'https://storage.wikawika.xyz/static/04e2a7a3-34a7-469f-9320-cffac35e1ad3.jpg',
      character:'https://pica-pica.wikawika.xyz/special/frame-253.png?g\u003d2',
      email:'futarisuki',
      gender:'m',
      level:4,
      name:'神经变态绅士耶',
      title:'纯爱蕾姆女仆娇小阔爱温柔体贴病娇状态赛高',
      type:3,
      user_id:'58bc4224712c5d0778c5ec1d',
      platform:'PC'
    }
  },
  mutations: {
    setUserInfo (state, userInfo){
      state.userInfo = userInfo
    }
  },
  actions: {},
  modules: {},
});
