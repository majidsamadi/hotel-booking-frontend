import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    hotels: [],
    fromDate: '',
    toDate: '',
    guests: 1,
    q: ''
  }),
  actions: {
    setSearchData({ hotels, fromDate, toDate, guests, q }) {
      this.hotels = hotels
      this.fromDate = fromDate
      this.toDate = toDate
      this.guests = guests
      this.q = q
    }
  }
})
