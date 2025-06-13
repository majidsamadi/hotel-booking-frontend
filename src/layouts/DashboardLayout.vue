<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">Booking App</div>
      <nav>
        <router-link to="/dashboard" class="nav-item">Home</router-link>
        <router-link to="/search" class="nav-item">Search</router-link>
        <router-link to="/bookings" class="nav-item">My Bookings</router-link>
        <router-link to="/profile" class="nav-item">Profile</router-link>
      </nav>
      <button @click="handleLogout" class="btn logout-btn">Logout</button>
    </aside>

    <!-- Main panel -->
    <div class="main">
      <header>
        <h1>{{ title }}</h1>
      </header>
      <section class="widgets">
        <router-view />
        
      </section>

    </div>

    
  </div>
</template>

<script>
import { logout } from '../services/authService';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'DashboardLayout',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const handleLogout = () => {
      logout();
      router.push('/login');
    };
    const title = route.meta.title || 'Dashboard';
    return { handleLogout, title };
  }
};
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  height: 100vh;
  background: #f5f7fa;
}

/* Sidebar */
.sidebar {
  background: #2a2f4a;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}
.logo {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}
.nav-item {
  display: block;
  margin: 0.8rem 0;
  padding: 0.6rem 1rem;
  color: #cbd5e1;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s;
}
.nav-item.router-link-active {
  background: #3e445f;
  color: #fff;
}
.nav-item:hover {
  background: #3e445f;
}
.logout-btn {
  margin-top: auto;
  background: #ef5350;
  border: none;
  padding: 0.8rem;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
}
.logout-btn:hover {
  background: #d32f2f;
}

/* Main content */
.main {
  display: flex;
  flex-direction: column;
}
header {
  padding: 1.5rem 2rem;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}
header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
}
.widgets {

  overflow-y: scroll;
}
</style>
