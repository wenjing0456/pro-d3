export default [
    {
        path:'/',
        name:'home',
        component:() => import('@/views/index/index.vue')
    },
    {
        path:'/color',
        name:'color',
        component:() => import('@/views/detail/index.vue')
    },
]