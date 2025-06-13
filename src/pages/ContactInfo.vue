<template>
  <section class="contact-info">
    <h2 class="section-title">Contact Information</h2>

    <div class="form-section">
      <label>
        <input type="checkbox" v-model="useLoggedInUser" @change="fillFromUser" />
        I'm the main guest
      </label>

      <div class="form-grid">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="form.first_name"
            :disabled="useLoggedInUser"
          />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="form.last_name"
            :disabled="useLoggedInUser"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            :disabled="useLoggedInUser"
          />
        </div>

        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            :disabled="useLoggedInUser"
          />
        </div>
      </div>
    </div>

    <div class="actions">
      <router-link to="/search/room-details" class="btn secondary">Back</router-link>
      <router-link to="/search/confirmation" class="btn primary">Continue</router-link>
    </div>
  </section>
</template>

<script>
import { getUserProfile } from '../services/services';

export default {
  name: 'ContactInfo',
  data() {
    return {
      useLoggedInUser: false,
      user: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
      },
      form: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
      }
    };
  },
  async mounted() {
    try {
      this.user = await getUserProfile();
    } catch (err) {
      console.error('Failed to fetch user profile', err);
    }
  },
  methods: {
    fillFromUser() {
      if (this.useLoggedInUser) {
        this.form = { ...this.user };
      }
    }
  }
};
</script>

<style scoped>
.contact-info {
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.form-section {
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.3rem;
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.btn.primary {
  background-color: #4f46e5;
  color: white;
}

.btn.secondary {
  background-color: #e2e8f0;
  color: #333;
}
</style>
