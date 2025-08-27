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
      <RouterLink :to="`/Category/${categoria.slug}/`" v-for="(categoria, index) in store.categories"
        class="categoria"
        :style="{
          color: categoria.text_color,
          backgroundImage: `url(${categoria.image})`,
        }"
        :key="index"
        >
        {{ categoria.name }}
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

.categoria {
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
.categoria:nth-child(4n) {
  margin-right: 0;
}
.categoria:hover {
  cursor: pointer;
}
</style>