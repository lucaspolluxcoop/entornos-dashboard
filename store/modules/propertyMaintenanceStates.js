export const state = () => ({
  propertyMaintenanceStates: [],
})

export const actions = {
  async getPropertyMaintenanceStates(context) {
    const { data } = await this.$propertyMaintenanceStateService.getAll()
    context.commit('SET_PROPERTY_MAINTENANCE_STATES', data.propertyMaintenanceStates)
  }
}

export const mutations = {
  SET_PROPERTY_MAINTENANCE_STATES(state, value) {
    state.propertyMaintenanceStates = value
  }
}
