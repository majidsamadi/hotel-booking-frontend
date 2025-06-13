<template>
  <div class="container">
    <div class="trace">
      <div class="dates">Jun 17, 2025 → Jun 18, 2025</div>
      <div class="options">
        <div>1 Night | 1 Guest</div>
        <a href="#">Sort by: Lowest Price ▾</a>
      </div>
    </div>
    <ul class="room-list">
      <li class="room" v-for="room in rooms" :key="room.id">
        <img :src="room.image" :alt="room.name" />
        <div class="room-info">
          <h3>{{ room.name }}</h3>
          <div class="subtitle">{{ room.subtitle }}</div>
          <p>{{ room.description }}</p>
        </div>
        <div class="room-action">
          <div class="price">${{ room.price }} <span>/night</span></div>
          <div class="note">Subject to GST and charges</div>
          <button @click="bookRoom(room)">Book Room</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
  data() {
    return {
      rooms: [
        {
          id: 1,
          name: 'Room 1 Title',
          subtitle: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: 'https://via.placeholder.com/340x210',
          price: 1080
        },
        {
          id: 2,
          name: 'Room 2 Title',
          subtitle: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: 'https://via.placeholder.com/340x210',
          price: 1280
        }
      ]
    };
  },
  methods: {
    bookRoom(room) {
      this.$router.push({ name: 'booking', query: { roomId: room.id } });
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

.results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-body h3 {
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
  color: #2d3748;
}

.card-body p {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 1.2rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #4f46e5;
}

.price span {
  font-size: 0.85rem;
  font-weight: normal;
  color: #6b7280;
}

.btn {
  background: #4f46e5;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
}

.btn:hover {
  background: #4338ca;
}
</style>

