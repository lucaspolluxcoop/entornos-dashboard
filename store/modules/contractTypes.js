export const state = () => ({
  contractTypes: [],
})

export const actions = {
  async getContractTypes(context) {
    const { data } = await this.$contractTypeService.getAll()
    context.commit('SET_CONTRACT_TYPES', data.contractTypes)
  }
}

export const mutations = {
  SET_CONTRACT_TYPES(state, value) {
    state.contractTypes = value
  },
}
