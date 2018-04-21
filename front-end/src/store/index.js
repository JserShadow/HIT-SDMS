import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    form_step: 0,
    routerList: [
      '/edit/basicInfo',
      '/edit/personalInfo',
    ],
  },
  mutations: {
    stepForward(state) {
      state.form_step++;
    },
    stepBack(state) {
      state.form_step--;
    },
    setFormStep(state) {
      state.form_step = 0;
    }
  }
})

