export const state = () => ({
  warrantyTypes: [],
})

export const actions = {
  async getWarrantyTypes(context) {
    const { data } = await this.$warrantyTypeService.getAll()
    context.commit('SET_WARRANTY_TYPES', data.warrantyTypes)
  }
}

export const mutations = {
  SET_WARRANTY_TYPES(state, value) {
    state.warrantyTypes = value
  },
}
