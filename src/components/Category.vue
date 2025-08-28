<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCatalogStore } from '@/stores/catalog';
import axios from 'axios';

const route = useRoute();
const store = useCatalogStore();

const slug = computed(() => route.params.categorySlug);

watch(() => store.city.id, async (newId, oldId) => {
  getProducts();
});

const products = ref([]);

function getProducts() {
  axios.get(`/api/ru/api/catalog3/v1/menutags/${slug.value}/`, {
      params: {
        'city_id': store.city.id,
      }, 
    })
    .then(response => {
      if (response.data?.products) {
        products.value = response.data.products
      }
    })
    .catch(error => {
      console.error('Ошибка при запросе:', error);
    });
}

onMounted(() => {
  getProducts();
});

</script>

<template>
  <RouterLink to="/">назад</RouterLink>
  Каталог - {{ store?.currentSlug?.name }}
  <div v-for="(product, index) in products" :key="index">
    <pre>{{ product }}</pre>
    </br>
  </div>
</template>