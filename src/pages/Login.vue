<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h1 class="heading">Login</h1>
      <p class="subheading">Access your account</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <div class="form-remember">
          <input type="checkbox" id="rememberMe" v-model="rememberMe" />
          <label for="rememberMe">Remember me</label>
        </div>

        <button type="submit" class="login-btn">Sign In</button>
      </form>

      <p class="footer">
        Don’t have an account?
        <router-link to="/register">Create one</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { login } from '../services/authService';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      router: useRouter()
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await login(this.email, this.password, this.rememberMe);
        this.router.push('/dashboard');
      } catch (err) {
        alert(err.message || 'Login failed');
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0e7ff, #fdf2f8);
  height: 100vh;
  padding: 1rem;
}

.login-box {
  background: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.heading {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: #4f46e5;
}

.subheading {
  margin-bottom: 2rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.25rem;
  text-align: left;
  padding: 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  color: #374151;
}

.form-group input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  background: #f9fafb;
  transition: border 0.3s ease;
}

.form-group input:focus {
  border-color: #6366f1;
  background: #fff;
}

.form-remember {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  text-align: left;
  gap: 0.5rem;
}

.login-btn {
  background: #4f46e5;
  color: white;
  padding: 0.9rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: #4338ca;
}

.footer {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.footer a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
