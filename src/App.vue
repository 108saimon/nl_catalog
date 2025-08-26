<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';

onMounted(() => {
  axios.get('/api/ru/api/catalog3/v1/menutags/', {
      params: {
        'city_id': 1
      }, 
      // Не задаём User-Agent/Content-Type вручную — браузер их установит сам
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Ошибка при запросе:', error);
    });
  // Ключевые поля для использования:
  // name - название категории
  // text_color - цвет текста названия категории
  // image - изображение для плитки категории
  // slug - уникальный тэг категории, для запроса данных категории и формирования адреса страниц
});

</script>

<template>
  <header class="header wrapper">
    <div class="container">
      <div class="current-city">Выбор города</div>
    </div>
  </header>
  <div class="wrapper">
    <div class="catalog-categories container">
      категории
    </div>
  </div>

</template>

<style>
@import url('./assets/css/reset.css');
@import url('./assets/css/main.css');
</style>
<style scoped>
.header {
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px 0px #2727271A;
  height: 72px;
}
.current-city {
  font-family: 'FuturaPTBold', sans-serif;
  font-weight: normal;
	font-style: normal;
}

</style>

