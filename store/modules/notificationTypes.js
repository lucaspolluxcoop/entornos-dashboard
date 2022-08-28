export const state = () => ({
  notificationTypes: [],
})

export const actions = {
  async getNotificationTypes(context) {
    const { data } = await this.$notificationTypesService.getAll()
    context.commit('SET_NOTIFICATION_TYPES', data.notificationTypes)
  },
}

export const mutations = {
  SET_NOTIFICATION_TYPES(state, value) {
    state.notificationTypes = value
  },
}
