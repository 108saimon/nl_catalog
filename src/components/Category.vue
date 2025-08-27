<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCatalogStore } from '@/stores/catalog';

const route = useRoute();
const store = useCatalogStore();

const slug = computed(() => route.params.categorySlug);
</script>

<template>
  <RouterLink to="/">назад</RouterLink>
  Каталог - {{ store?.currentSlug?.name }}
</template>