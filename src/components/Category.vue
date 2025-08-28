<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCatalogStore } from '@/stores/catalog';
import axios from 'axios';

const route = useRoute();
const store = useCatalogStore();

const slug = computed(() => route.params.categorySlug);

const showSidebar = computed(() => store.showProductsSidebar || false);

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
  <div class="wrapper">
    <div class="container">
      <h1 class="catalog-category__header">
        <RouterLink to="/" class="to-home__link"></RouterLink>{{ store?.currentSlug?.name }}
      </h1>
    </div>
  </div>
  <div class="wrapper">
    <div class="container">
      <div 
        class="products__wrapper"
        :class="{ 'products__wrapper__with-sidebar': showSidebar }"
        >
        <div class="products-sidebar">
          <div class="products-sidebar__list" v-if="showSidebar">
            <div class="products-sidebar__list-item"
              v-for="(children, index) in store.currentSlug.children"
              :key="index"
              :class="{ 'products-sidebar__list-item-active' : false }">
              {{ children.name }}
            </div>
          </div>
        </div>
        <div class="products-list">
          567
        </div>
      </div>
    </div>
  </div>
  <!-- <RouterLink to="/">назад</RouterLink>
  Каталог - {{ store?.currentSlug?.name }}
  <div v-for="(product, index) in products" :key="index">
    <pre>{{ product }}</pre>
    </br>
  </div> -->
  <!-- Ключевые поля продукта для использования:
  main_image_thumb_300 - изображение
  category.name - название категории
  present_name - название продукта
  comment_name - текст под названием продукта
  price - цена (всегда в рублях)
  allowed и available - если хоть одно поле false, тогда товара нет в наличии
  tags - список категорий и подкатегорий, в которые входит продукт -->
</template>

<style scoped>
.catalog-category__header {
  font-family: 'FuturaPTBold', sans-serif;
  font-size: 44px;
  margin-bottom: 20px;
}

.products__wrapper {
  display: grid;
  grid-template-columns: 1fr;
}

.products__wrapper__with-sidebar {
  grid-template-columns: 240px 1fr;
  gap: 34px;
}

/* <div class="products__wrapper">
  <div class="products-sidebar">
    123
  </div>
  <div class="products-list">
    567
  </div>
</div> */

.to-home__link {
  width: 30px;
  height: 30px;
  text-decoration: none;
  background-image: url('/arrow-left.svg');
  margin-right: 7px;
  display: inline-block;
}
</style>