<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCatalogStore } from '@/stores/catalog';
import axios from 'axios';

const route = useRoute();
const store = useCatalogStore();

const slug = computed(() => route.params.categorySlug);
const categorySubSlug = computed(() => route.params?.categorySubSlug);

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
            <RouterLink class="products-sidebar__list-item"
              :class="{ 'products-sidebar__list-item-active' : !categorySubSlug }"
              :to="`/category/${slug}/`">
              Все продукты
            </RouterLink>
            <RouterLink class="products-sidebar__list-item"
              v-for="(children, index) in store.currentSlug.children"
              :key="index"
              :class="{ 'products-sidebar__list-item-active' : categorySubSlug === children.slug }"
              :to="`/category/${slug}/${children.slug}/`">
              {{ children.name }}
            </RouterLink>
          </div>
        </div>
        <div class="products-list" :class="{ 'products-list-wide': !showSidebar }">
          <!-- Ключевые поля продукта для использования:
          main_image_thumb_300 - изображение
          category.name - название категории
          present_name - название продукта
          comment_name - текст под названием продукта
          price - цена (всегда в рублях)
          allowed и available - если хоть одно поле false, тогда товара нет в наличии
          tags - список категорий и подкатегорий, в которые входит продукт -->
          <div class="products-list-item"
            v-for="(product, index) in products"
            :key="index">
            <!-- <div class="products-list-item__image"> -->
            <img :src="product.main_image_thumb_300" class="products-list-item__image" />
            <!-- </div> -->
            <div class="products-list-item__wrapper">
              <div class="products-list-item__category-name">{{product.category.name}}</div>
              <div class="products-list-item__present_name">{{product.present_name}}</div>
              <div class="products-list-item__comment_name">{{product.comment_name}}</div>
              <div class="products-list-item__price">{{product.price}} ₽</div>
            </div>
            <!-- <div class="products-list-item__category-name">{{product.allowed, product.available}}</div> -->
            <!-- <div>{{product.tags}}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
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

.products-sidebar__list-item {
  display: block;
  color: #000;
  font-family: 'FuturaPTLight';
  font-size: 16px;
  text-decoration: none;
  height: 40px;
  padding: 12px;
  border-bottom: 1px solid #E9EEF3;
}
.products-sidebar__list-item-active {
  background: #E9EEF3;
  color: #202648;
}

/* <div class="products-list-item"
v-for="(product, index) in products"
:key="index">
<div class="products-list-item__image">
  <img :src="product.main_image_thumb_300" />
</div>
<div class="products-list-item__category-name">{{product.category.name}}</div>
<div class="products-list-item__present_name">{{product.present_name}}</div>
<div class="products-list-item__comment_name">{{product.comment_name}}</div>
<div class="products-list-item__price">{{product.price}}</div> */
.products-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.products-list-wide {
  grid-template-columns: repeat(4, 1fr);
}

.products-list-item {
  width: 276px;
  /* height: 494px; */
  background: #fff;
  box-shadow: 0px 2px 10px 0px #97979733;
  margin-bottom: 24px;
  margin-right: 24px;
  text-align: center;
}
.products-list-item__image {
  width: 100%;
  display: block;
  margin-bottom: 6px;
}
.products-list-item__wrapper {
  padding: 0 12px 24px;
}
.products-list-item__category-name {
  font-size: 14px;
  color: #979797;
  font-family: 'FuturaPTLight';
  margin-bottom: 4px;
}
.products-list-item__present_name {
  font-size: 20px;
  font-family: 'FuturaPTBold', sans-serif;
  margin-bottom: 9px;
}
.products-list-item__comment_name {
  color: #272727;
  font-size: 16px;
  font-family: 'FuturaPTLight';
  min-height: 20px;
  margin-bottom: 14px;
}
.products-list-item__price {
  font-size: 26px;
  font-family: 'FuturaPTBold', sans-serif;
}

.to-home__link {
  width: 30px;
  height: 30px;
  text-decoration: none;
  background-image: url('/arrow-left.svg');
  margin-right: 7px;
  display: inline-block;
}
</style>