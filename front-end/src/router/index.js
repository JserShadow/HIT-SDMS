import Vue from 'vue'
import Router from 'vue-router'
import PersonalInfomation from '@/components/personalInfomation'
import Form from '@/components/formPage';
import Basic from '@/components/forms/basic';
import Personal from '@/components/forms/personal';

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
        }
      ]
    }
  ]
})
