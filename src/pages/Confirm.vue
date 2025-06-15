<template>
  <section class="confirmation-container">
    <div class="confirmation-box">
      <div class="checkmark">✔</div>
      <h2 class="headline">Booking Confirmed!</h2>
      <p class="subhead">Thanks, {{ guestName }}. Your reservation is complete.</p>

      <div class="summary-card">
        <h3>{{ hotelName }}</h3>
        <p class="room">{{ roomType }} — ${{ pricePerNight.toFixed(2) }}/night</p>
        <p><strong>Check-in:</strong> {{ fromDate }}</p>
        <p><strong>Check-out:</strong> {{ toDate }}</p>
        <p><strong>Guests:</strong> {{ guests }}</p>
        <p><strong>Total:</strong> ${{ totalPrice.toFixed(2) }}</p>
      </div>

      <router-link to="/dashboard" class="dashboard-button">
        Back to Dashboard
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useSearchStore } from '../stores/searchStore'

import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

// Access route params
const route = useRoute()
const store = useSearchStore()

const roomId = route.query.room_id
const fromDate = route.query.from_date
const toDate = route.query.to_date
const guests = route.query.guests || 1

const hotel = computed(() =>
  store.hotels.find(h => h.room?.id === roomId)
)

const hotelName = computed(() => hotel.value?.name || 'Hotel')
const roomType = computed(() => hotel.value?.room?.room_type || '')
const pricePerNight = computed(() => hotel.value?.room?.price_per_night || 0)

function dateDiff(start, end) {
  const d1 = new Date(start)
  const d2 = new Date(end)
  return Math.max((d2 - d1) / (1000 * 60 * 60 * 24), 1)
}
const nights = computed(() => dateDiff(fromDate, toDate))
const totalPrice = computed(() => pricePerNight.value * nights.value)

const guestName = userStore.user.first_name + ' ' + userStore.user.last_name; // You can later fetch this from the user profile if needed
</script>

<style scoped>
.confirmation-container {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  background: #f8fafc;
  min-height: 80vh;
  box-sizing: border-box;
}

.confirmation-box {
  background: white;
  padding: 40px;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
}

.checkmark {
  font-size: 60px;
  color: #22c55e;
  margin-bottom: 20px;
}

.headline {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
}

.subhead {
  font-size: 16px;
  color: #475569;
  margin-bottom: 30px;
}

.summary-card {
  background-color: #f1f5f9;
  padding: 20px;
  border-radius: 12px;
  text-align: left;
  margin-bottom: 30px;
  font-size: 15px;
  color: #334155;
}

.summary-card h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #1e293b;
}

.summary-card .room {
  font-weight: 500;
  margin-bottom: 10px;
}

.dashboard-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
}
.dashboard-button:hover {
  background-color: #2563eb;
}
</style>
