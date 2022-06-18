export const state = () => ({
  contractNotificationCategories: [],
})

export const actions = {
  async getContractNotificationCategories(context) {
    const { data } = await this.$contractNotificationCategoryService.getAll()
    context.commit('SET_CONTRACT_NOTIFICATION_CATEGORIES', data.contractNotificationCategories)
  }
}

export const mutations = {
  SET_CONTRACT_NOTIFICATION_CATEGORIES(state, value) {
    state.contractNotificationCategories = value
  },
}
