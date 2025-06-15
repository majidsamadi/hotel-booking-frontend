<template>
  <div class="booking-history">
    <div class="tabs">
      <button :class="{ active: tab === 'upcoming' }" @click="switchTab('upcoming')">Upcoming</button>
      <button :class="{ active: tab === 'all' }" @click="switchTab('all')">All Bookings</button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="bookings.length === 0" class="empty">No bookings found.</div>

    <div v-else class="booking-list">
      <div
        class="booking-card"
        v-for="(booking, index) in bookings"
        :key="index"
        @click="goToDetails(booking)"
      >
        <img :src="booking.hotelInfo.coverimage" alt="Room" />
        <div class="booking-info">
          <h3>{{ booking.hotelInfo.name }}</h3>
          <p>{{ booking.hotelInfo.city }} - {{ booking.hotelInfo.address }}</p>
          <p><strong>Room:</strong> {{ booking.roomInfo.room_type }} | {{ booking.roomInfo.beds }}</p>
          <p><strong>Dates:</strong> {{ booking.reservationInfo.from_date }} → {{ booking.reservationInfo.to_date }}</p>
          <span class="status" :class="booking.reservationInfo.status">
            {{ booking.reservationInfo.status.toUpperCase() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllBookings, getUpComingBookings } from '../services/services';
import { useBookingStore } from '../stores/bookingStore';

const router = useRouter();
const bookingStore = useBookingStore();

const tab = ref('upcoming');
const bookings = ref([]);
const loading = ref(false);

const fetchBookings = async () => {
  loading.value = true;
  bookings.value = [];
  try {
    bookings.value =
      tab.value === 'upcoming'
        ? await getUpComingBookings()
        : await getAllBookings();
  } catch (error) {
    console.error('[BookingHistory] Failed to load bookings:', error);
  } finally {
    loading.value = false;
  }
};

const switchTab = (newTab) => {
  if (tab.value !== newTab) {
    tab.value = newTab;
    fetchBookings();
  }
};

const goToDetails = (booking) => {
  bookingStore.setSelectedBooking(booking);
  router.push({ name: 'BookingDetails', params: { id: booking.reservationInfo.id } });
};

onMounted(() => {
  fetchBookings();
});
</script>

<style scoped>
.booking-history {
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.tabs button {
  background: none;
  border: 2px solid #ccc;
  padding: 0.5rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.tabs button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.booking-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.booking-card {
  display: flex;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.booking-card:hover {
  transform: scale(1.01);
}

.booking-card img {
  width: 160px;
  height: 120px;
  object-fit: cover;
}

.booking-info {
  padding: 1rem;
  flex-grow: 1;
}

.booking-info h3 {
  margin: 0 0 0.5rem;
}

.status {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.status.confirmed {
  background-color: #d4edda;
  color: #155724;
}

.status.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.loading,
.empty {
  text-align: center;
  padding: 2rem;
  color: #888;
}
</style>
