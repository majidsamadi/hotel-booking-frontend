<template>
  <div class="booking-container">
    <div class="header-actions">
      <button class="btn-back" @click="goBack">← Back to My Bookings</button>
      <button
        v-if="booking.reservationInfo.status === 'confirmed'"
        class="btn-cancel"
        @click="cancelBookingRequest"
      >
        Cancel Booking
      </button>
    </div>

    <div class="booking-card">
      <!-- Left: Room Image -->
      <div class="image-section">
        <img :src="booking.hotelInfo.coverimage" alt="Room Image" />
      </div>

      <!-- Right: Details -->
      <div class="details-section">
        <!-- Hotel Info -->
        <h2 class="hotel-name">{{ booking.hotelInfo.name }}</h2>
        <p class="location">
          <i class="fas fa-map-marker-alt"></i> {{ booking.hotelInfo.address }}, {{ booking.hotelInfo.city }}
        </p>
        <p class="landmark">Near: {{ booking.hotelInfo.landmark }}</p>

        <!-- Status -->
        <div class="status-wrapper">
          <span :class="['status-pill', booking.reservationInfo.status]">
            {{ booking.reservationInfo.status.toUpperCase() }}
          </span>
        </div>

        <!-- Room Info -->
        <div class="info-block">
          <h3>Room</h3>
          <p><strong>Type:</strong> {{ booking.roomInfo.room_type }}</p>
          <p><strong>Beds:</strong> {{ booking.roomInfo.beds }}</p>
          <p><strong>Capacity:</strong> {{ booking.roomInfo.capacity }} guests</p>
          <p><strong>Amenities:</strong> {{ booking.roomInfo.amenities.join(', ') }}</p>
        </div>

        <!-- Guest Info -->
        <div class="info-block">
          <h3>Guest Info</h3>
          <p><strong>Name:</strong> {{ booking.reservationInfo.guest_name }} {{ booking.reservationInfo.guest_family_name }}</p>
          <p><strong>ID Number:</strong> {{ booking.reservationInfo.guest_id_number }}</p>
          <p><strong>Phone:</strong> {{ booking.reservationInfo.guest_phone }}</p>
        </div>

        <!-- Booking Dates & Pricing -->
        <div class="pricing-block">
          <h3>Booking Summary</h3>
          <p><strong>From:</strong> {{ booking.reservationInfo.from_date }}</p>
          <p><strong>To:</strong> {{ booking.reservationInfo.to_date }}</p>
          <p><strong>Nightly Rate:</strong> ${{ booking.roomInfo.price_per_night }}</p>
          <p class="total">
            <strong>Total Price:</strong> ${{ totalPrice }}
            <span class="nights">({{ numberOfNights }} nights)</span>
          </p>
        </div>
      </div>
    </div>

    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useBookingStore } from '../stores/bookingStore'
import { cancelBooking } from '../services/services'

const bookingStore = useBookingStore()
const booking = computed(() => bookingStore.selectedBooking)
const error = ref('')
const router = useRouter()

const goBack = () => {
  router.push({ name: 'BookingHistory' })
}

const cancelBookingRequest = async () => {
  try {
    await cancelBooking(booking.value.reservationInfo.id)
    bookingStore.selectedBooking.reservationInfo.status = 'cancelled'
  } catch (err) {
    console.error('[BookingDetails] Cancel failed:', err)
    error.value = 'Something went wrong. Please try again.'
  }
}

const numberOfNights = computed(() => {
  const from = dayjs(booking.value.reservationInfo.from_date)
  const to = dayjs(booking.value.reservationInfo.to_date)
  return to.diff(from, 'day')
})

const totalPrice = computed(() => {
  return (numberOfNights.value * booking.value.roomInfo.price_per_night).toFixed(2)
})
</script>

<style scoped>
.booking-container {
  max-width: 1100px;
  margin: auto;
  padding: 2rem;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.btn-back,
.btn-cancel {
  padding: 0.6rem 1.2rem;
  border: none;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
}

.btn-back {
  background: #eaeaea;
}

.btn-cancel {
  background: #dc3545;
  color: white;
}

.booking-card {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.image-section {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details-section {
  flex: 2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.hotel-name {
  font-size: 1.8rem;
  margin-bottom: 0.2rem;
}

.location,
.landmark {
  color: #666;
  font-size: 0.95rem;
}

.status-wrapper {
  margin-top: 0.8rem;
  margin-bottom: 1.2rem;
}

.status-pill {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  font-size: 0.8rem;
  border-radius: 20px;
  font-weight: bold;
}

.status-pill.confirmed {
  background: #d4edda;
  color: #155724;
}

.status-pill.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.info-block {
  margin-bottom: 1.5rem;
}

.info-block h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.2rem;
}

.pricing-block {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-top: auto;
}

.pricing-block h3 {
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
}

.total {
  margin-top: 0.6rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.nights {
  font-size: 0.85rem;
  font-weight: normal;
  color: #888;
  margin-left: 5px;
}

.error-msg {
  color: red;
  margin-top: 2rem;
  text-align: center;
  font-weight: bold;
}
</style>
