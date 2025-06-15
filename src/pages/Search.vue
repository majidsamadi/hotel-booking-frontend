<template>
  <div class="search-content">
    <h2 class="search-title">Find your perfect stay</h2>
    <form class="search-form" @submit.prevent="handleSearch">
      <input
        type="text"
        v-model="query"
        placeholder="Search by hotel, landmark, or location..."
      />

      <div class="form-group">
        <label>
          From
          <input type="date" v-model="fromDate" />
        </label>
        <label>
          To
          <input type="date" v-model="toDate" />
        </label>
      </div>

      <label>
        Guests
        <input type="number" v-model="guests" min="1" />
      </label>

      <button type="submit">Search</button>
    </form>
  </div>
</template>


<script>
import { searchRooms } from '../services/services';
import { useSearchStore } from '../stores/searchStore';

export default {
  name: 'SearchPage',
  data() {
    return {
      query: '',
      fromDate: '',
      toDate: '',
      guests: 1
    };
  },
  methods: {
    async handleSearch() {
      const searchStore = useSearchStore();

      const searchData = {
        q: this.query || '',
        from_date: this.fromDate,
        to_date: this.toDate,
        guests: this.guests,
        sort_by: 'price_asc',
        page: 1,
        per_page: 10
      };

      try {
        const result = await searchRooms(searchData);

        // Save all search parameters + result in the store
        searchStore.setSearchData({
          hotels: result,
          fromDate: searchData.from_date,
          toDate: searchData.to_date,
          guests: searchData.guests,
          q: searchData.q
        });

        // Navigate to results page
        this.$router.push({ name: 'SearchResults' });

      } catch (err) {
        console.error('Search failed:', err.message);
      }
    }
  }
};
</script>


<style scoped>
.search-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input[type="text"],
input[type="date"],
input[type="number"] {
  padding: 0.75rem 0rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
}

input:focus {
  outline: none;
  border-color: #6366f1;
}

.form-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-group label {
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
  min-width: 200px;
}

button[type="submit"] {
  background-color: #6366f1;
  color: white;
  padding: 0.9rem;
  border: none;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

button[type="submit"]:hover {
  background-color: #4f46e5;
}

.search-content {
  background: white;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
</style>
