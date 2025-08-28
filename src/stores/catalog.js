import { defineStore } from 'pinia'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    city: {
      id: 1,
      city: 'Новосибирск',
      label: ''
    },
    categories: [],
    currentSlug: {
      children: [],
    },
  }),
  getters: {
    showProductsSidebar: (state) => state.currentSlug.children.length > 2,
  },
  actions: {
  },
})