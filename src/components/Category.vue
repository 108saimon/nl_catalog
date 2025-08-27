<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCatalogStore } from '@/stores/catalog';
import axios from 'axios';

const route = useRoute();
const store = useCatalogStore();

const slug = computed(() => route.params.categorySlug);

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
      // if (response.data?.tags) {
      //   store.categories = response.data.tags;
      //   if (route?.params?.categorySlug) {
      //     store.currentSlug = store.categories.find(category => category.slug === route.params.categorySlug);
      //   }
      // }
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