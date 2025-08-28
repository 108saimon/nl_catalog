import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '@/components/Catalog.vue';
import Category from '@/components/Category.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Catalog',
      component: Catalog,
    },
    {
      path: '/category/:categorySlug/',
      name: 'Category',
      component: Category,
    },
    {
      path: '/category/:categorySlug/:categorySubSlug/',
      name: 'SubCategory',
      component: Category,
    },
  ],
})

export default router
