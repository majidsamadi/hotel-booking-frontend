<script setup>
import { useSearchStore } from '../stores/searchStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useSearchStore();
const hotels = computed(() => store.hotels);
const router = useRouter();

function goToRoom(roomId) {
  router.push({ path: '/search/details', query: { room_id: roomId } });
}
</script>

<template>
  <div class="results-page">
    <div class="results-header">
      <h1>Available Rooms</h1>
      <router-link to="/search" class="back-button">← Back to Search</router-link>
    </div>

    <div v-if="hotels.length === 0" class="no-results">
      <p>No rooms found for your search criteria.</p>
    </div>

    <div v-else class="hotel-list">
      <div
        v-for="hotel in hotels"
        :key="hotel.id"
        class="hotel-card"
        @click="goToRoom(hotel.room.id)"
      >
        <img :src="hotel.coverimage" alt="Room image" />
        <div class="info">
          <h2>{{ hotel.name }}</h2>
          <p class="location">{{ hotel.address }}</p>
          <p class="type">{{ hotel.room.room_type }} • {{ hotel.room.beds }}</p>
          <p class="price">${{ hotel.price.toFixed(2) }} / night</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results-page {
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.results-header h1 {
  font-size: 1.8rem;
  margin: 0;
}

.back-button {
  font-size: 0.95rem;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.back-button:hover {
  color: #3730a3;
}

.no-results {
  font-size: 1.1rem;
  color: #666;
}

.hotel-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.hotel-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.hotel-card:hover {
  transform: translateY(-4px);
}

.hotel-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.hotel-card .info {
  padding: 1rem;
}

.hotel-card h2 {
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
}

.hotel-card .location {
  font-size: 0.9rem;
  color: #777;
}

.hotel-card .type {
  font-size: 0.95rem;
  margin: 0.25rem 0;
}

.hotel-card .price {
  font-weight: 600;
  color: #4f46e5;
  margin-top: 0.5rem;
}
</style>
