export const state = () => ({
  plateStates: [],
})

export const actions = {
  async getPlateStates(context) {
    const { data } = await this.$plateStateService.getAll()
    context.commit('SET_PLATE_STATES', data.plateStates)
  }
}

export const mutations = {
  SET_PLATE_STATES(state, value) {
    state.plateStates = value
  },
}
