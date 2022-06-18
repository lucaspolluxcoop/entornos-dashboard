export const state = () => ({
  properties: [],
  property: null,
  meta: null
})

export const getters = {
  propertiesTotal(state) {
    return state.meta ? state.meta.total : 0
  }
}

export const actions = {
  async getProperties(context, params) {
    const { data } = await this.$propertyService.getAll(params)
    context.commit('SET_PROPERTIES', data.data.properties)
    context.commit('SET_META', data.meta)
  },

  async getProperty(context, propertyId) {
    const { data } = await this.$propertyService.get(propertyId)
    context.commit('SET_PROPERTY', data)
  },

  async createProperty(context, property) {
    const { data } = await this.$propertyService.post(property)
    context.commit('SET_PROPERTY', data)
  },

  async updateProperty(context, property) {
    const { data } = await this.$propertyService.patch(property)
    context.commit('SET_PROPERTY', data)
  },

  async deleteProperty(context, propertyId) {
    await this.$propertyService.delete(propertyId)
  },

  async addPromertyAmmenities(context, propertyWithAmmenity) {
    await this.$propertyService.addAmmenities(propertyWithAmmenity)
  },

  async addPropertyServices(context, propertyWithServices) {
    await this.$propertyService.addServices(propertyWithServices)
  },

  async addPropertyAntiquity(context, propertyWithAntiquity) {
    await this.$propertyService.addAntiquity(propertyWithAntiquity)
  }
}

export const mutations = {
  SET_PROPERTIES(state, value) {
    state.properties = value
  },
  SET_PROPERTY(state, value) {
    state.property = value
  },
  SET_META(state, value) {
    state.meta = value
  }
}
