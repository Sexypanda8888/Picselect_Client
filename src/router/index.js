import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import PicBlock from '@/components/PicBlock'
import CheckPassword from '@/components/CheckPassword'
import FindbyID from '@/components/FindByID'
import ShowList from '@/components/ShowList'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/test',
            name: 'BlockTest',
            component: PicBlock
        },
        {
            path: '/check',
            name: 'CheckPassword',
            component: CheckPassword
        },
        {
            path: '/find',
            name: 'FindbyID',
            component: FindbyID
        },
        {
            path: '/showlist',
            name: 'ShowList',
            component: ShowList
        }
    ]
})
