<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const slug = computed(() => route.params.categorySlug);
</script>

<template>
  Каталог - {{ slug }}
</template>