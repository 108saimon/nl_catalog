<script setup>
import { useCatalogStore } from '@/stores/catalog';

const store = useCatalogStore();
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <h1 class="catalog-categories__header">Категории товаров</h1>
    </div>
  </div>
  <div class="wrapper">
    <div class="catalog-categories container" v-if="store.categories.length > 0">
      <RouterLink :to="`/category/${category.slug}/`" v-for="(category, index) in store.categories"
        class="category"
        :style="{
          color: category.text_color,
          backgroundImage: `url(${category.image})`,
        }"
        :key="index"
        >
        {{ category.name }}
      </RouterLink>
    </div>
  </div>
</template>

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

.category {
  width: 288px;
  height: 152px;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 22px;
  margin-right: 22px;
  font-size: 24px;
  text-decoration: none;
  box-sizing: border-box;
  background-size: cover;
}
.category:nth-child(4n) {
  margin-right: 0;
}
.category:hover {
  cursor: pointer;
}
</style>