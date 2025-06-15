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
import BookingHistory from '../pages/BookingHistory.vue';
import BookingDetails from '../pages/BookingDetails.vue';
import UserProfile from '../pages/UserProfile.vue';
import EditUserProfile from '../pages/EditUserProfile.vue';

export const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      { path: '', redirect: '/dashboard' },
      {
        path: 'dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard', requiresAuth: true }
      },
      {
        path: 'bookings',
        name: 'BookingHistory',
        component: BookingHistory,
        meta: { title: 'My Bookings', requiresAuth: true }
      },
      {
        path: 'bookings/details',
        name: 'BookingDetails',
        component: BookingDetails,
        meta: { title: 'Booking Details', requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile,
        meta: { title: 'User Profile', requiresAuth: true }
      },
      {
        path: 'profile/edit',
        name: 'EditUserProfile',
        component: EditUserProfile,
        meta: { title: 'Edit Profile', requiresAuth: true }
      },
      {
        path: 'search',
        component: SearchLayout,
        children: [
          {
            path: '',
            component: Search,
            meta: { title: 'Search', requiresAuth: true }
          },
          {
            path: 'results',
            name: 'SearchResults',
            component: SearchResults,
            meta: { title: 'Search Results', requiresAuth: true }
          },
          {
            path: 'details',
            name: 'RoomDetails',
            component: RoomDetails,
            meta: { title: 'Room Details', requiresAuth: true }
          },
          {
            path: 'contact',
            name: 'ContactInfo',
            component: ContactInfo,
            meta: { title: 'Contact Info', requiresAuth: true }
          },
          {
            path: 'confirm',
            name: 'Confirm',
            component: Confirm,
            meta: { title: 'Confirm Booking', requiresAuth: true }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    component: Registration,
    meta: { guestOnly: true }
  }
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
  } else if (to.meta.guestOnly && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
