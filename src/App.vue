<script setup>
import axios from 'axios';
import { onMounted, watch } from 'vue';
import Header from './components/Header.vue';
import { useCatalogStore } from './stores/catalog';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useCatalogStore();

watch(() => route.params.categorySlug, async (newId, oldId) => {
  store.currentSlug = store.categories.find(category => category.slug === newId);
}, { immediate: true });

function getCatalogMenutags() {
  alert(1);
  axios.get('/api/ru/api/catalog3/v1/menutags/', {
      params: {
        'city_id': store.city.id,
      }, 
    })
    .then(response => {
      if (response.data?.tags) {
        store.categories = response.data.tags;
        if (route?.params?.categorySlug) {
          store.currentSlug = store.categories.find(category => category.slug === route.params.categorySlug);
        }
      }
    })
    .catch(error => {
      console.error('Ошибка при запросе:', error);
    });
}

function cityChange(payload) {
  store.city = payload;
  getCatalogMenutags();
}

onMounted(() => {
  getCatalogMenutags();
});

</script>

<template>
  <Header
    :city="store.city"
    @city-change="cityChange"
    />
  <router-view />

</template>

<style>
@import url('./assets/css/reset.css');
@import url('./assets/css/main.css');
</style>
<style scoped>
</style>

