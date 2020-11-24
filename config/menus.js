import Index from '~/pages/admin/login'
import Dashboard from '~/pages/admin/dashboard'
import Businesses from '~/pages/admin/businesses'
import Admin from '~/pages/admin'
import Settings from '~/pages/admin/settings'
export default {
   routeItems: [
    {
      path: '/',
      component: Index,
      name: 'index',
      hidden: true
    },
    {
      path: '/admin',
      component: Admin,
      name: 'admin',
      hidden: true
    },
    {
      path: '/admin/dashboard',
      component: Dashboard,
      name: 'dashboard',
      meta: {
        title: 'Dashboard',
        icon: 'menu',
        affix: true
      }
    },
    {
        path: '/admin/businesses',
        component: Businesses,
        name: 'businesses',
        meta: {
          title: 'Businesses',
          icon: 'menu',
          affix: true
        }
      },
    {
      path: '/admin/settings',
      component: Settings,
      name: 'settings',
      meta: {
        title: 'Settings',
        icon: 'setting'
      }
    }
]
}