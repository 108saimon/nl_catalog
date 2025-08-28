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

watch(() => route.params?.categorySubSlug, async (newId, oldId) => {
  filterProducts();
});

const products = ref([]);

const filteredProducts = ref([]);

function filterProducts() {
  const subSlug = categorySubSlug.value;
  if (subSlug) {
    filteredProducts.value = products.value.filter(product => Array.isArray(product.tags) && product.tags.some(tag => tag.slug === subSlug));
  } else {
    filteredProducts.value = products.value;
  }
}

function getProducts() {
  axios.get(`/api/ru/api/catalog3/v1/menutags/${slug.value}/`, {
      params: {
        'city_id': store.city.id,
      }, 
    })
    .then(response => {
      if (response.data?.products) {
        products.value = response.data.products
        const subSlug = categorySubSlug.value;
        if (subSlug) {
          filteredProducts.value = products.value.filter(product => Array.isArray(product.tags) && product.tags.some(tag => tag.slug === subSlug));
        } else {
          filteredProducts.value = products.value;
        }
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
            v-for="(product, index) in filteredProducts"
            :key="index">
            <!-- <div class="products-list-item__image"> -->
            <img :src="product.main_image_thumb_300" class="products-list-item__image" />
            <!-- </div> -->
            <div class="products-list-item__wrapper">
              <div class="products-list-item__category-name">{{product.category.name}}</div>
              <div class="products-list-item__present_name">{{product.present_name}}</div>
              <div class="products-list-item__comment_name">{{product.comment_name}}</div>
              <div class="products-list-item__price">{{product.price}} ₽</div>
              <button class="buy-button"
                :class="{ 'buy-button-active' : product.allowed && product.available }">
                {{ product.allowed && product.available ? 'В корзину' : 'Нет в наличии' }}
              </button>
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
  gap: 0;
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

.products-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.products-list-wide {
  grid-template-columns: repeat(4, 1fr);
}

.products-list-item {
  width: 276px;
  background: #fff;
  box-shadow: 0px 2px 10px 0px #97979733;
  margin-bottom: 24px;
  margin-right: 24px;
  text-align: center;
}
.products-list-item:nth-child(3n) {
  margin-right: 0px;
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
  margin-bottom: 14px;
}
.products-list-item__price {
  font-size: 26px;
  font-family: 'FuturaPTBold', sans-serif;
  margin-bottom: 16px;
}

.buy-button {
  box-sizing: border-box;
  width: 212px;
  height: 48px;
  border-radius: 24px;
  border: 2px solid rgba(151, 151, 151, 0.3);
  color: rgba(172, 172, 172, 1);
  font-size: 16px;
  font-family: 'FuturaPTBold', sans-serif;
  background: #fff;
  z-index: 20;
  position: relative;
}
.buy-button-active {
  background: linear-gradient(270deg, #FFA800 0%, #FF6F00 60.2%);
  color: #fff;
  cursor: pointer;
  border: none;
  background: linear-gradient(270deg, rgba(255, 168, 0, 0.6) 0%, rgba(255, 111, 0, 0.6) 100%);
}
.buy-button-active::before {
  content: "";
  position: absolute;
  inset: 0px;
  transform: translate(2px, 6px);
  z-index: -1;
  background: linear-gradient(270deg, rgba(255, 168, 0, 0.6) 0%, rgba(255, 111, 0, 0.6) 100%);
  filter: blur(10px);
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