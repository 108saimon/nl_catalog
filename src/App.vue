<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import Header from './components/Header.vue';

const cityId = ref(1);

const categories = ref([]);

function initCatalog() {
  axios.get('/api/ru/api/catalog3/v1/menutags/', {
      params: {
        'city_id': cityId.value,
      }, 
    })
    .then(response => {
      if (response.data?.tags) {
        categories.value = response.data.tags;
        console.log(categories.value);
      }
    })
    .catch(error => {
      console.error('Ошибка при запросе:', error);
    });
    // Ключевые поля для использования:
    // name - название категории
    // text_color - цвет текста названия категории
    // image - изображение для плитки категории
    // slug - уникальный тэг категории, для запроса данных категории и формирования адреса страниц
}

onMounted(() => {
  initCatalog();
});

</script>

<template>
  <Header />
  <div class="wrapper">
    <div class="container">
      <h1 class="catalog-categories__header">Категории товаров</h1>
    </div>
  </div>
  <div class="wrapper">
    <div class="catalog-categories container">
      <div v-for="(categoria, index) in categories"
        class="categoria"
        :style="{
          color: categoria.text_color,
          backgroundImage: `url(${categoria.image})`,
        }"
        :key="index"
        >
        {{ categoria.name }}
      </div>
    </div>
  </div>

</template>

<style>
@import url('./assets/css/reset.css');
@import url('./assets/css/main.css');
</style>
<style scoped>
.catalog-categories__header {
  font-family: 'FuturaPTBold', sans-serif;
  font-size: 44px;
  margin-bottom: 20px;
}

.catalog-categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.categoria {
  width: 288px;
  height: 152px;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 22px;
  font-size: 24px;
}
.categoria:hover {
  cursor: pointer;
}
</style>

