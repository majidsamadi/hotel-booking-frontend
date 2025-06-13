<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Room Details</div>
      <div class="card-body">
        <div class="image-gallery">
          <div class="main-image">
            <img :src="currentImage" alt="Main Room Image" />
          </div>
          <div class="thumbnails">
            <img
              v-for="(img, index) in thumbnails"
              :key="index"
              :src="img"
              :data-full="img"
              :class="{ active: currentImage === img }"
              @click="currentImage = img"
              alt="Room Thumbnail"
            />
          </div>
        </div>
        <div class="room-info">
          <h2>{{ room.name }}</h2>
          <div class="subtitle">{{ room.description }}</div>
          <p>{{ room.details }}</p>
          <div class="Amenities">
            <h3>Amenities</h3>
            <ul>
              <li v-for="(amenity, i) in room.amenities" :key="i">{{ amenity }}</li>
            </ul>
          </div>
        </div>
        <div class="action">
          <div class="price">${{ room.price }}<span>/night</span></div>
          <div class="note">Prices subject to taxes and fees</div>
          <button @click="continueBooking">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomDetails',
  data() {
    return {
      currentImage: 'https://via.placeholder.com/800x500?text=Room+Image+1',
      thumbnails: [
        'https://via.placeholder.com/800x500?text=Room+Image+1',
        'https://via.placeholder.com/800x500?text=Room+Image+2',
        'https://via.placeholder.com/800x500?text=Room+Image+3'
      ],
      room: {
        name: 'Deluxe Suite',
        description: '2 Guests · 1 King Bed · 45 m²',
        details: 'Our Deluxe Suite features spacious living area, premium amenities, and stunning views. Enjoy complimentary Wi-Fi, minibar, and 24/7 room service.',
        amenities: ['Free Wi-Fi', 'Minibar', 'Room Service', 'Air Conditioning', 'Ocean View'],
        price: 320
      }
    };
  },
  methods: {
    continueBooking() {
      this.$router.push('/book');
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: auto;
  padding: 2rem;
}

.steps {
  display: flex;
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  counter-reset: step;
}

.steps li {
  position: relative;
  text-align: center;
  flex: 1;
  padding-bottom: 1rem;
  font-weight: 500;
  color: #999;
}

.steps li.active {
  color: #4f46e5;
  font-weight: 600;
}

.steps li.active::after {
  background: #4f46e5;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-header {
  background: #4f46e5;
  color: #fff;
  padding: 1.2rem 1.6rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.card-body {
  padding: 2rem;
}

.image-gallery {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.main-image img {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
}

.thumbnails {
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.thumbnails img {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.thumbnails img.active,
.thumbnails img:hover {
  opacity: 1;
  border: 2px solid #4f46e5;
}

.room-info h2 {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.room-info .subtitle {
  color: #6b7280;
  margin-bottom: 1rem;
}

.room-info p {
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.Amenities h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #2d3748;
}

.Amenities ul {
  list-style: disc;
  padding-left: 1.2rem;
  color: #4a5568;
}

.Amenities li {
  margin-bottom: 0.4rem;
}

.action {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
  margin-top: 2rem;
  text-align: right;
}

.action .price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4f46e5;
  margin-bottom: 0.2rem;
}

.action .price span {
  font-size: 1rem;
  font-weight: normal;
  color: #6b7280;
}

.action .note {
  font-size: 0.85rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.action button {
  background: #4f46e5;
  color: #fff;
  padding: 0.8rem 1.4rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

.action button:hover {
  background: #4338ca;
}
</style>

