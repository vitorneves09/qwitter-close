
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('src/pages/PageHome.vue'),
        name: "Home"
      },
      { 
        path: '/abount', 
        component: () => import('src/pages/PageAbount.vue'),
        name:"Abount"
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
