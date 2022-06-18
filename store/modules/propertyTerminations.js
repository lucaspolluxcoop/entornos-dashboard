export const state = () => ({
	propertyTerminations: [],
})

export const actions = {
	async getPropertyTerminations(context) {
		const { data } = await this.$propertyTerminationService.getAll()
		context.commit('SET_PROPERTY_TERMINATIONS', data.propertyTerminations)
	},
}

export const mutations = {
	SET_PROPERTY_TERMINATIONS(state, value) {
		state.propertyTerminations = value
	},
}
