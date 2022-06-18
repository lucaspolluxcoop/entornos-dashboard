export const state = () => ({
  users: [],
  meta: null,
})

export const getters = {
  usersTotal(state) {
    return state.meta ? state.meta.total : 0
  }
}

export const actions = {
  async getUsers(context, params) {
    const { data } = await this.$revisionUserService.getAll(params)
    context.commit('SET_USERS', data.data.users)
    context.commit('SET_META', data.meta)
  },
}

export const mutations = {
  SET_USERS(state, value) {
    state.users = value
  },
  SET_META(state, value) {
    state.meta = value
  },
}
