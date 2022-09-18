export const state = () => ({
  users: [],
  meta: null,
  user: null
})

export const getters = {
  usersTotal(state) {
    return state.meta ? state.meta.total : 0
  }
}

export const actions = {
  async getUsers(context, params) {
    const { data } = await this.$userService.getAll(params)
    context.commit('SET_USERS', data.data.users)
    context.commit('SET_META', data.meta)
  },

  async getUser(context, id) {
    const { data } = await this.$userService.get(id)
    context.commit('SET_USER', data)
  },

  async updateUser(context, user) {
    const { data } = await this.$userService.patch(user)
    context.commit('SET_USER', data)
  },

  async createUser(context, user) {
    const { data } = await this.$userService.post(user)
    context.commit('SET_USER', data)
  },

  async deleteUser(context, id) {
    await this.$userService.delete(id)
  }
}

export const mutations = {
  SET_USERS(state, value) {
    state.users = value
  },
  SET_META(state, value) {
    state.meta = value
  },
  SET_USER(state, value) {
    state.user = value
  },
  ADD_NEW_USER(state) {
    if (state.user) {
      state.users.push(state.user)
    }
  }
}

