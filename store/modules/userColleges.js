export const state = () => ({
  colleges: [],
})

export const actions = {
  async getColleges(context) {
    const { data } = await this.$userCollegeService.getAll()
    context.commit('SET_COLLEGES', data.users)
  }
}

export const mutations = {
  SET_COLLEGES(state, value) {
    state.colleges = value
  },
}
