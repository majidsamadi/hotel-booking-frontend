<template>
  <div class="register-wrapper">
    <div class="register-box">
      <h1 class="heading">Register</h1>
      <p class="subheading">Create your account</p>

      <form @submit.prevent="handleRegister" class="form-grid">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="firstName" required />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="lastName" required />
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" v-model="phone" required />
        </div>

        <div class="form-group">
          <label for="idNumber">IC/Passport Number</label>
          <input type="text" id="idNumber" v-model="idNumber" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>

        <div class="form-button">
          <button type="submit" class="register-btn" :disabled="!isFormValid">
            Sign Up
          </button>
        </div>
      </form>

      <p class="footer">
        Already have an account?
        <router-link to="/login">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { register } from '../services/authService';
import { useRouter } from 'vue-router';

export default {
  name: 'RegistrationPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idNumber: '',
      password: '',
      confirmPassword: '',
      router: useRouter()
    };
  },
  computed: {
    isFormValid() {
      return (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.phone &&
        this.idNumber &&
        this.password &&
        this.confirmPassword &&
        this.password === this.confirmPassword
      );
    }
  },
  methods: {
    async handleRegister() {
      try {
        await register({
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          phone: this.phone,
          id_number: this.idNumber,
          password: this.password
        });
        this.router.push('/login');
      } catch (err) {
        alert(err.message || 'Registration failed');
      }
    }
  }
};
</script>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(135deg, #f0f9ff, #fef3c7);
  min-height: 100vh;
  padding: 3rem 1rem;
}

.register-box {
  background: #ffffff;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 720px;
  width: 100%;
}

.heading {
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: #0f766e;
}

.subheading {
  text-align: center;
  margin-bottom: 2rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  color: #374151;
}

.form-group input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  outline: none;
  transition: border 0.3s ease;
}

.form-group input:focus {
  border-color: #0f766e;
  background: #fff;
}

.form-button {
  grid-column: span 2;
  margin-top: 1rem;
}

.register-btn {
  background: #0f766e;
  color: white;
  padding: 0.9rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;
}

.register-btn:disabled {
  background: #a5b4fc;
  cursor: not-allowed;
}

.register-btn:hover:enabled {
  background: #0e645e;
}

.footer {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.footer a {
  color: #0f766e;
  text-decoration: none;
  font-weight: 500;
}

.footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-button {
    grid-column: span 1;
  }
}
</style>
