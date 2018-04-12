import Vue from 'vue'
import Router from 'vue-router'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import PersonalInfomation from '@/components/personalInfomation'
import Form from '@/components/formPage';
import Basic from '@/components/forms/basic';
import Personal from '@/components/forms/personal';
import Family from '@/components/forms/family';
import Graduate from '@/components/forms/graduate';

Vue.use(Vant);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PersonalInfomation',
      component: PersonalInfomation
    },
    {
      path: '/edit',
      name: 'Form',
      component: Form,
      children: [
        {
          name: 'basic',
          path: 'basicInfo',
          component: Basic
        },
        {
          name: 'personal',
          path: 'personalInfo',
          component: Personal
        },
        {
          name: 'family',
          path: 'familyInfo',
          component: Family
        },
        {
          name: 'graduate',
          path: 'graduateInfo',
          component: Graduate
        }
      ]
    }
  ]
})
