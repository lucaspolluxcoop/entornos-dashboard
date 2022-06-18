export const state = () => ({
  contractNotificationResponses: [],
})

export const actions = {
  async getContractNotificationResponses(context) {
    const { data } = await this.$contractNotificationResponseService.getAll()
    context.commit('SET_CONTRACT_NOTIFICATION_RESPONSES', data.contractNotificationResponses)
  }
}

export const mutations = {
  SET_CONTRACT_NOTIFICATION_RESPONSES(state, value) {
    state.contractNotificationResponses = value
  },
}
