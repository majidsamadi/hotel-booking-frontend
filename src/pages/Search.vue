<template>
  <section class="search-container">
    <form @submit.prevent="handleSubmit" class="search-form">
      <div class="form-group">
        <label for="destination">Destination</label>
        <input v-model="form.destination" type="text" id="destination" required />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="checkin">Check-in</label>
          <input v-model="form.checkin" type="date" id="checkin" required />
        </div>
        <div class="form-group">
          <label for="checkout">Check-out</label>
          <input v-model="form.checkout" type="date" id="checkout" required />
        </div>
      </div>

      <div class="form-group">
        <label for="guests">Guests</label>
        <select v-model="form.guests" id="guests">
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
        </select>
      </div>

      <button type="submit" class="btn">Search</button>
    </form>
  </section>
</template>

<script>
import { searchRooms } from '../services/services';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, watch, onMounted } from 'vue';


export default {
    name: 'Search',
    setup() {
    const router = useRouter();
    const form = reactive({
        destination: '',
        checkin: '',
        checkout: '',
        guests: '1'
    });

    const handleSubmit = async () => {
        try {
        const results = await searchRooms(form);
        router.push({ path: '/search-results', query: { data: JSON.stringify(results) } });
        } catch (err) {
        alert('Search failed: ' + err.message);
        }
    };

    return { form, handleSubmit };
    }

};
</script>

<style scoped>
.search-container {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.search-form {
  display: flex;
  flex-direction: column;
}
.form-group {
  margin-bottom: 1.2rem;
}
label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
  color: #333;
}
input, select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.form-row {
  display: flex;
  gap: 1rem;
}
.form-row .form-group {
  flex: 1;
}
.btn {
  background-color: #4C51BF;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.btn:hover {
  background-color: #3C3EAB;
}
</style>
