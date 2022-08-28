export const state = () => ({
  notificationResponses: [],
})

export const actions = {
  async getNotificationResponses(context) {
    const { data } = await this.$notificationResponsesService.getAll()
    context.commit('SET_NOTIFICATION_RESPONSES', data.notificationResponses)
  },
}

export const mutations = {
  SET_NOTIFICATION_RESPONSES(state, value) {
    state.notificationResponses = value
  },
}
