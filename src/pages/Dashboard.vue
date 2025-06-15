<template>
  <section class="dashboard-container">
    <header class="dashboard-header">
      <h1>Welcome, {{ user.first_name }} {{ user.last_name }}</h1>
      <div class="profile-info">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>ID:</strong> {{ user.id_number }}</p>
      </div>
    </header>

    <div class="dashboard-cards">
      <div class="card">
        <h2>Search Hotels</h2>
        <p>Find your next stay quickly.</p>
        <router-link to="/search" class="card-btn">Search Now</router-link>
      </div>
      <div class="card">
        <h2>My Bookings</h2>
        <p>View or manage your past and future stays.</p>
        <router-link to="/bookings" class="card-btn">Go to Bookings</router-link>
      </div>
      <div class="card">
        <h2>Edit Profile</h2>
        <p>Keep your personal details up-to-date.</p>
        <router-link to="/profile" class="card-btn">Go to Profile</router-link>
      </div>
    </div>
  </section>
</template>



<script>
import { getUserProfile } from '../services/services';
import { useUserStore } from '../stores/userStore';

export default {
  name: 'Dashboard',
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        id_number: ''
      }
    };
  },
  async mounted() {
    try {
      const store = useUserStore(); // ✅ get the store instance
      this.user = await getUserProfile();
      store.setUser(this.user); // ✅ pass actual user data
      console.log('User profile loaded and stored:', this.user);
    } catch (err) {
      console.error('Failed to load profile:', err.message);
    }
  }
};
</script>


<style scoped>
.dashboard-container {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.dashboard-header {
  background: #ffffff;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  text-align: center;
}

.dashboard-header h1 {
  font-size: 2.2rem;
  color: #1e293b;
  margin-bottom: 0.6rem;
}

.profile-info p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #475569;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #ffffff;
  padding: 1.8rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.card h2 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 0.6rem;
}

.card p {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 1.2rem;
}

.card-btn {
  display: inline-block;
  padding: 0.65rem 1.3rem;
  background: #4f46e5;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s;
}

.card-btn:hover {
  background: #4338ca;
}
</style>
