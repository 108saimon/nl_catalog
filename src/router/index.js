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
      path: '/Category/:categorySlug/',
      name: 'Category',
      component: Category,
    },
  ],
})

export default router
