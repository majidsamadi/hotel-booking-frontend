import { createRouter, createWebHistory } from 'vue-router';

import Login from '../pages/Login.vue';
import Registration from '../pages/Registration.vue';

import DashboardLayout from '../layouts/DashboardLayout.vue';
import SearchLayout from '../layouts/SearchLayout.vue';

import Dashboard from '../pages/Dashboard.vue';
import Search from '../pages/Search.vue';
import SearchResults from '../pages/SearchResults.vue';
import RoomDetails from '../pages/RoomDetails.vue';
import ContactInfo from '../pages/ContactInfo.vue';
import Confirm from '../pages/Confirm.vue';

export const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: Dashboard, meta: { title: 'Dashboard' } },
      {
        path: 'search',
        component: SearchLayout,
        children: [
          { path: '', component: Search, meta: { title: 'Search' } },
          { path: 'results', component: SearchResults, meta: { title: 'Search Results' } },
          { path: 'details', component: RoomDetails, meta: { title: 'Room Details' } },
          { path: 'contact', component: ContactInfo, meta: { title: 'Contact Info' } },
          { path: 'confirm', component: Confirm, meta: { title: 'Confirm Booking' } }
        ]
      }
    ]
  },
  { path: '/login', component: Login },
  { path: '/register', component: Registration }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
