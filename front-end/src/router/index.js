import Vue from 'vue'
import Router from 'vue-router'
import PersonalInfomation from '@/components/personalInfomation'
import Form from '@/components/formPage';
import Basic from '@/components/forms/basic';
import Personal from '@/components/forms/personal';
import Transcript from '@/components/iframe';
import Admin from '@/components/admin'
import AdminInfo from '@/components/adminComponents/admin-info';
import AdminScore from '@/components/adminComponents/admin-score';
import AdminSecondClass from '@/components/adminComponents/admin-secondclass';
import AdminScholarship from '@/components/adminComponents/admin-scholarship';
import AdminTechnology from '@/components/adminComponents/admin-technology';
import AdminCertificate from '@/components/adminComponents/admin-certificate';
import AdminSocialPractice from '@/components/adminComponents/admin-socialPractice';
import AdminRemark from '@/components/adminComponents/admin-remark';
import AdminExport from '@/components/adminComponents/admin-export';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PersonalInfomation',
      component: PersonalInfomation
    },
    {
      path: '/transcript',
      name: 'Transcript',
      component: Transcript
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
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'info',
          name: 'AdminInfo',
          component: AdminInfo
        },
        {
          path: 'score',
          name: 'AdminScore',
          component: AdminScore
        },
        {
          path: 'secondclass',
          name: 'AdminSecondClass',
          component: AdminSecondClass
        },
        {
          path: 'scholarship',
          name: 'AdminScholarship',
          component: AdminScholarship
        },
        {
          path: 'technology',
          name: 'AdminTechnology',
          component: AdminTechnology
        },
        {
          path: 'certificate',
          name: 'AdminCertificate',
          component: AdminCertificate
        },
        {
          path: 'socialpractice',
          name: 'AdminSocialPractice',
          component: AdminSocialPractice
        },
        {
          path: 'remark',
          name: 'AdminRemark',
          component: AdminRemark
        },
        {
          path: 'export2csv',
          name: 'AdminExport',
          component: AdminExport
        },
      ]
    }
  ]
})
