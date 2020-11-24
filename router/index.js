import Detail from '@/pages/province/detail'



export default new Router({
  routes: [    
   {
      path: '/province/:id',
      name: 'Province',
      component: Detail
    }
  ]
})