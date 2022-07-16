export const state = () => ({
  extintionReasons: [],
})

export const actions = {
  async getExtintionReasons(context) {
    const { data } = await this.$extintionReasonService.getAll()
    context.commit('SET_EXTINTION_REASONS', data.extintionReasons)
  }
}

export const mutations = {
  SET_EXTINTION_REASONS(state, value) {
    state.extintionReasons = value
  },
}
