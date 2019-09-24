import Vue from 'vue'
import Router from 'vue-router'
import db from '@/components/db/db'
import file from '@/components/file/file'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: ''
    },
    {
      path: '/db',
      name: 'db',
      component: db
    },
    {
      path: '/file',
      name: 'file',
      component: file
    }
  ]
})
