import { defineStore } from 'pinia'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    city: {
      id: 1,
      city: 'Новосибирск',
      label: ''
    },
    categories: [],
  }),
  actions: {
  },
})