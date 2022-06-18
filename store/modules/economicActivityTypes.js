export const state = () => ({
	economicActivityTypes: [],
})

export const actions = {
	async getEconomicActivityTypes(context) {
		const { data } = await this.$economicActivityTypeService.getAll()
		context.commit('SET_ECONOMIC_ACTIVITY_TYPES', data.economicActivityTypes)
	},
}

export const mutations = {
	SET_ECONOMIC_ACTIVITY_TYPES(state, value) {
		state.economicActivityTypes = value
	},
}
