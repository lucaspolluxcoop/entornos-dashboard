export const state = () => ({
  notifications: [],
  notification: null,
})

export const actions = {
  async createNotification(context, notification) {
    const { data } = await this.$notificationsService.post(notification)
    context.commit('SET_NOTIFICATION', data)
  },
  async updateNotification(context, notification) {
    const { data } = await this.$notificationsService.patch(notification)
    context.commit('SET_NOTIFICATION', data)
  },
  async getNotification(context, notificationId) {
    const { data } = await this.$notificationsService.get(notificationId)
    context.commit('SET_NOTIFICATION', data)
  },
}

export const mutations = {
  SET_NOTIFICATION(state, value) {
    state.notification = value
  },
}
