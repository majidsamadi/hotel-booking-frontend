<template>
  <div class="profile-page">
    <div class="card">
      <h2>User Profile</h2>
      <div class="info-grid">
        <div><strong>First Name:</strong> {{ user.first_name }}</div>
        <div><strong>Last Name:</strong> {{ user.last_name }}</div>
        <div><strong>Email:</strong> {{ user.email }}</div>
        <div><strong>Phone:</strong> {{ user.phone }}</div>
        <div><strong>ID Number:</strong> {{ user.id_number }}</div>
      </div>
      <button @click="editProfile" class="edit-btn">Edit Profile</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const user = userStore.user
const router = useRouter()

const editProfile = () => {
  router.push({ name: 'EditUserProfile' })
}
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

.card {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;
  column-gap: 2rem;
  margin-bottom: 2rem;
}

.edit-btn {
  background-color: #007bff;
  color: white;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #0056b3;
}
</style>
