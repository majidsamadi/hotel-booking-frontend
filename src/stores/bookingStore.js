// src/stores/bookingStore.js
import { defineStore } from 'pinia';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    selectedBooking: null
  }),
  actions: {
    setSelectedBooking(booking) {
      this.selectedBooking = booking;
    },
    clearSelectedBooking() {
      this.selectedBooking = null;
    }
  }
});
