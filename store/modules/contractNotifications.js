export const state = () => ({
  contractNotifications: [],
  contractNotification: null,
})

export const actions = {
  async getContractNotifications(context, params) {
    const { data } = await this.$contractNotificationService.getAll(params)
    context.commit('SET_CONTRACT_NOTIFICATIONS', data.contractNotifications)
  },

  async getContractNotification(context, notificationId) {
    const { data } = await this.$contractNotificationService.get(notificationId)
    context.commit('SET_CONTRACT_NOTIFICATION', data)
  },

  async createContractNotification(context, notification) {
    const { data } = await this.$contractNotificationService.create(notification)
    context.commit('SET_CONTRACT_NOTIFICATION', data)
  },

  async updateContractNotification(context, notification) {
    const { data } = await this.$contractNotificationService.patch(notification)
    context.commit('SET_CONTRACT_NOTIFICATION', data)
  },

  async deleteContractNotifications(context, notificationId) {
    await this.$contractNotificationService.delete(notificationId)
  }
}

export const mutations = {
  SET_CONTRACT_NOTIFICATIONS(state, value) {
    state.contractNotifications = value
  },
  SET_CONTRACT_NOTIFICATION(state, value) {
    state.contractNotification = value
  },
}
