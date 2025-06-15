<template>
  <section class="contact-form">
    <div class="form-box">
      <h2>Guest Information</h2>

      <p v-if="error" class="error">{{ error }}</p>

      <form @submit.prevent="handleBooking">
        <div class="form-group checkbox">
          <input type="checkbox" id="isMainGuest" v-model="isMainGuest" @change="handleMainGuestToggle" />
          <label for="isMainGuest">I am the main guest</label>
        </div>

        <div class="form-group">
          <label for="guestName">First Name</label>
          <input type="text" id="guestName" v-model="guestName" :disabled="isMainGuest" required />
        </div>

        <div class="form-group">
          <label for="guestFamilyName">Family Name</label>
          <input type="text" id="guestFamilyName" v-model="guestFamilyName" :disabled="isMainGuest" required />
        </div>

        <div class="form-group">
          <label for="guestId">ID Number</label>
          <input type="text" id="guestId" v-model="guestIdNumber" :disabled="isMainGuest" required />
        </div>

        <div class="form-group">
          <label for="guestPhone">Phone</label>
          <input type="tel" id="guestPhone" v-model="guestPhone" :disabled="isMainGuest" required />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Booking...' : 'Confirm Booking' }}
        </button>
      </form>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { bookRoom } from '../services/services'
import { useUserStore } from '../stores/userStore'
import { useSearchStore } from '../stores/searchStore'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
const searchStore = useSearchStore()

const guestName = ref('')
const guestFamilyName = ref('')
const guestPhone = ref('')
const guestIdNumber = ref('')
const isMainGuest = ref(true)
const error = ref('')
const loading = ref(false)

// --- Debug startup state
console.log('[ContactInfo] Route Query:', route.query)
console.log('[ContactInfo] UserStore:', userStore.user)
console.log('[ContactInfo] SearchStore:', {
  from_date: searchStore.fromDate,
  to_date: searchStore.toDate
})

// --- Fill fields from userStore if checkbox checked
const fillUserData = () => {
  guestName.value = userStore.user.first_name || ''
  guestFamilyName.value = userStore.user.last_name || ''
  guestIdNumber.value = userStore.user.id_number || ''
  guestPhone.value = userStore.user.phone || ''

  console.log('[ContactInfo] Fields auto-filled from userStore:', {
    guestName: guestName.value,
    guestFamilyName: guestFamilyName.value,
    guestIdNumber: guestIdNumber.value,
    guestPhone: guestPhone.value
  })
}

const clearFields = () => {
  guestName.value = ''
  guestFamilyName.value = ''
  guestIdNumber.value = ''
  guestPhone.value = ''
  console.log('[ContactInfo] Guest fields cleared')
}

const handleMainGuestToggle = () => {
  if (isMainGuest.value) {
    fillUserData()
  } else {
    clearFields()
  }
}

// Run once on mount
onMounted(() => {
  if (isMainGuest.value) fillUserData()
})

const handleBooking = async () => {
  error.value = ''
  loading.value = true

  const bookingData = {
    room_id: route.query.room_id,
    from_date: searchStore.fromDate,
    to_date: searchStore.toDate,
    is_user_main_guest: isMainGuest.value,
    guest_name: guestName.value,
    guest_family_name: guestFamilyName.value,
    guest_id_number: guestIdNumber.value,
    guest_phone: guestPhone.value
  }

  console.log('[ContactInfo] Booking Payload:', bookingData)

  try {
    await bookRoom(bookingData)
    console.log('[ContactInfo] Booking success! Redirecting...')

    router.push({
      name: 'Confirm',
      query: {
        room_id: bookingData.room_id,
        from_date: bookingData.from_date,
        to_date: bookingData.to_date,
        guests: searchStore.guests
      }
    })
  } catch (err) {
    console.error('[ContactInfo] Booking error:', err)
    error.value = 'Something went wrong. Please check your information and try again.'
  } finally {
    loading.value = false
  }
}
</script>



<style scoped>
.contact-form {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f8fafc;
  min-height: 100vh;
}

.form-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

h2 {
  margin-bottom: 20px;
  color: #1e293b;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 6px;
  color: #334155;
}

input[type="text"],
input[type="tel"] {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
}

.checkbox {
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox input {
  margin-right: 8px;
}

button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
  width: 100%;
}

button:hover {
  background-color: #2563eb;
}

button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
  margin-bottom: 15px;
  font-size: 14px;
}
</style>
