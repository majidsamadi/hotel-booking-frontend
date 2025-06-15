<template>
  <div class="room-wrapper">
    <div v-if="loading" class="loader">Loading room details...</div>

    <div v-else>
      <!-- 🖼️ Hero Image -->
      <div class="hero">
        <img :src="room.images[0]" alt="Main room image" class="hero-image" />
      </div>

      <!-- 🖼️ Thumbnail Gallery -->
      <div class="gallery-row">
        <img
          v-for="(img, index) in room.images"
          :key="index"
          :src="img"
          :alt="'Room image ' + (index + 1)"
        />
      </div>

      <!-- 📦 Room Info -->
      <div class="details-section">
        <router-link to="/search/results" class="back-button">← Back to Search Results</router-link>

        <div class="top-bar">
          <h1>{{ room.room_type }} Room</h1>
          <span class="price">${{ room.price_per_night.toFixed(2) }} / night</span>
        </div>

        <p class="description">{{ room.description }}</p>

        <div class="meta">
          <div><strong>Capacity:</strong> {{ room.capacity }} guest<span v-if="room.capacity > 1">s</span></div>
          <div><strong>Beds:</strong> {{ room.beds }}</div>
        </div>

        <!-- ✨ Amenities -->
        <div class="amenities">
          <h2>Amenities</h2>
          <ul>
            <li v-for="(a, i) in room.amenities" :key="i">
              <span>✔️</span> {{ a }}
            </li>
          </ul>
        </div>

        <!-- 🚀 CTA -->
        <router-link
          :to="{ path: '/search/contact', query: { room_id: room.id } }"
          class="cta-button"
        >
          Book This Room
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomDetails',
  data() {
    return {
      room: null,
      loading: true
    };
  },
  async created() {
    const roomId = this.$route.query.room_id;
    if (!roomId) return console.error('Missing room ID');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/room/${roomId}`);
      if (!res.ok) throw new Error('Failed to fetch room');
      this.room = await res.json();
    } catch (err) {
      console.error('Room fetch failed:', err.message);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.room-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background: #f7f7f8;
  padding-bottom: 2rem;
}

.loader {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.1rem;
  color: #555;
}

/* Hero Image */
.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-bottom: 5px solid #e5e5e5;
}

/* Thumbnail gallery */
.gallery-row {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 2rem;
  overflow-x: auto;
  background-color: #fff;
  box-shadow: inset 0 -1px 0 #eee;
}

.gallery-row img {
  height: 100px;
  width: 150px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.gallery-row img:hover {
  transform: scale(1.03);
}

/* Details Content */
.details-section {
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
  background: white;
  margin-top: 1rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
}

.top-bar h1 {
  font-size: 2rem;
  margin: 0;
}

.price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #4f46e5;
}

.description {
  font-size: 1rem;
  color: #444;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: #333;
}

/* Amenities */
.amenities h2 {
  margin-bottom: 0.5rem;
}

.amenities ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem 1rem;
}

.amenities li {
  display: flex;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #222;
}

/* CTA */
.cta-button {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s;
}

.cta-button:hover {
  background-color: #4338ca;
}

.back-button {
  display: inline-block;
  margin-bottom: 1rem;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s;
}

.back-button:hover {
  color: #3730a3;
}

</style>
