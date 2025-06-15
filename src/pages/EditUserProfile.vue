<template>
  <div class="edit-profile-page">
    <h1>Edit Your Profile</h1>

    <form @submit.prevent="submitUpdate" class="form-card">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input v-model="form.first_name" id="first_name" type="text" required />
      </div>

      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input v-model="form.last_name" id="last_name" type="text" required />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input v-model="form.phone" id="phone" type="tel" required />
      </div>

      <div class="form-group">
        <label for="id_number">ID Number</label>
        <input v-model="form.id_number" id="id_number" type="text" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Updating...' : 'Update Profile' }}
      </button>

      <p class="message success" v-if="successMessage">{{ successMessage }}</p>
      <p class="message error" v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { updateUserProfile } from '../services/services';

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
  first_name: userStore.user?.first_name || '',
  last_name: userStore.user?.last_name || '',
  phone: userStore.user?.phone || '',
  id_number: userStore.user?.id_number || ''
});

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const submitUpdate = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  loading.value = true;

  try {
    const updatedUser = await updateUserProfile({ ...form });
    userStore.setUser(updatedUser);
    successMessage.value = 'Profile updated successfully! Redirecting...';
    // ✅ Delay redirect by 4 seconds
    setTimeout(() => {
      router.push({ name: 'UserProfile' });
    }, 2000);
  } catch (err) {
    errorMessage.value = 'Failed to update profile. Please try again.';
    console.error('[EditUserProfile] Update failed:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.edit-profile-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.form-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.3rem;
}

.form-group input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  padding: 0.8rem 1.2rem;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  width: 100%;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.message {
  text-align: center;
  margin-top: 1rem;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
