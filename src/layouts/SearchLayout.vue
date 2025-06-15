<template>
  <div class="search-layout">
    <!-- Progress Steps -->
    <ol class="steps">
      <li :class="{ active: step >= 1 }">Search</li>
      <li :class="{ active: step >= 2 }">Select Room</li>
      <li :class="{ active: step >= 3 }">Contact Info</li>
      <li :class="{ active: step >= 4 }">Confirm</li>
    </ol>

    <!-- Page Content -->
    <div class="search-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: 'SearchLayout',
  computed: {
    step() {
      const route = useRoute();
      switch (route.path) {
        case '/search': return 1;
        case '/search/results': return 2;
        case '/search/details': return 2;
        case '/search/contact': return 3;
        case '/search/confirm': return 4;
        default: return 1;
      }
    }
  }
};
</script>

<style scoped>
.search-layout {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.steps {
  counter-reset: step;
  list-style: none;
  display: flex;
  background: #E7E9DF;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 24px;
  padding: 0;
}

.steps li {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-size: 0.9rem;
  color: #718096;
  position: relative;
}

.steps li::before {
  counter-increment: step;
  content: counter(step);
  display: inline-block;
  background: #fff;
  color: #2D3748;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  font-size: 0.85rem;
}

.steps li.active {
  color: #2D3748;
  font-weight: 500;
}

.steps li.active::before {
  background: #2D3748;
  color: #fff;
}

/* .search-content {
  background: white;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
} */
</style>
