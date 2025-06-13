<template>
  <section class="confirm-container">
    <h2 class="title">Confirm Your Booking</h2>

    <div class="card summary-card">
      <h3>Guest Information</h3>
      <p><strong>Name:</strong> {{ guest.first_name }} {{ guest.last_name }}</p>
      <p><strong>Email:</strong> {{ guest.email }}</p>
      <p><strong>Phone:</strong> {{ guest.phone }}</p>
    </div>

    <div class="card details-card">
      <h3>Booking Details</h3>
      <p><strong>Room:</strong> {{ booking.roomName }}</p>
      <p><strong>Dates:</strong> {{ booking.checkin }} – {{ booking.checkout }}</p>
      <p><strong>Guests:</strong> {{ booking.guests }}</p>
      <p><strong>Total Price:</strong> ${{ booking.totalPrice }}</p>
    </div>

    <div class="actions">
      <router-link to="/search/details" class="btn secondary">Back</router-link>
      <button class="btn primary" @click="confirmBooking">Confirm & Pay</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ConfirmBooking',
  data() {
    return {
      guest: {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      },
      booking: {
        roomName: '',
        checkin: '',
        checkout: '',
        guests: 1,
        totalPrice: 0
      }
    };
  },
  created() {
    // In a real app, you'd fetch or get this from a store or route state
    const state = this.$route.params.booking || {};
    Object.assign(this.guest, state.guest || {});
    Object.assign(this.booking, state.booking || {});
  },
  methods: {
    confirmBooking() {
      // TODO: Call booking API and handle response
      this.$router.push('/search/thank-you'); // Or show a confirmation page/modal
    }
  }
};
</script>

<style scoped>
.confirm-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.card {
  padding: 1.5rem;
  border-radius: 8px;
  background: #f9fafb;
  margin-bottom: 1.5rem;
}

.card h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #4f46e5;
}

.card p {
  margin: 0.4rem 0;
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
  cursor: pointer;
  font-weight: bold;
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
