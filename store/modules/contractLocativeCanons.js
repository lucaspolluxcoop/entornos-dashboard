export const state = () => ({
  contractLocativeCanons: [],
})

export const actions = {
  async getContractLocativeCanons(context) {
    const { data } = await this.$contractLocativeCanonService.getAll()
    context.commit('SET_CONTRACT_LOCATIVE_CANONS', data.contractLocativeCanons)
  }
}

export const mutations = {
  SET_CONTRACT_LOCATIVE_CANONS(state, value) {
    state.contractLocativeCanons = value
  },
}
