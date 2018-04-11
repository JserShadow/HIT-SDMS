import Vue from 'vue'
import Router from 'vue-router'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import PersonalInfomation from '@/components/personalInfomation'

Vue.use(Vant);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PersonalInfomation',
      component: PersonalInfomation
    }
  ]
})
