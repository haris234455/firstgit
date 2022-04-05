import Vue from 'vue'
import Vuex from 'vuex'
import StorefrontClient from 'lib/storefront-client'
import { queries } from './@graphql'

Vue.use(Vuex)

const client = new StorefrontClient({
  shop: window.HUROM.shop,
  accessToken: window.HUROM.storefrontAccessToken
})

export default new Vuex.Store({
  state: {
    collection: {},
    products: {},
    productTitle: '',
    modelHandle: '',
    productModels: []
  },
  mutations: {
    SET_COLLECTION (state, collection) {
      state.collection = collection
    },
    SET_PRODUCTS (state, products) {
      state.products = products
    },
    SET_PRODUCT_TITLE (state, title) {
      state.productTitle = title
    },
    SET_MODEL_HANDLE (state, handle) {
      state.modelHandle = handle
    },
    SET_PRODUCT_MODELS (state, products) {
      state.productModels = products
    }
  },
  actions: {
    async fetchCollectionByHandle ({ commit }, handle) {
      try {
        const { data: { collection } } = await client.fetch({
          query: queries.collectionByHandle,
          variables: {
            handle
          }
        })

        commit('SET_COLLECTION', collection)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProducts ({ commit }, query) {
      try {
        const { data: { products } } = await client.fetch({
          query: queries.products,
          variables: {
            query
          }
        })

        commit('SET_PRODUCTS', products)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProductModels ({ commit }, handle) {
      try {
        const { data: { collection: { products } } } = await client.fetch({
          query: queries.productModels,
          variables: {
            handle
          }
        })

        commit('SET_PRODUCT_MODELS', products.edges)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    collectionProducts (state) {
      if (!state.collection.products) {
        return []
      }

      return state.collection.products.edges
    },
    collectionId (state) {
      if (!state.collection.id) {
        return
      }

      return state.collection.id
    },
    collectionTitle (state) {
      if (!state.collection.title) {
        return
      }

      return state.collection.title
    },
    products (state) {
      if (!state.products.edges) {
        return []
      }

      return state.products.edges
    },
    title (state, getters) {
      if (state.productTitle) {
        return `Select the Part Needed for your ${state.productTitle}`
      }

      if (getters.collectionTitle) {
        return `Select your ${getters.collectionTitle} model`
      }
    }
  }
})
