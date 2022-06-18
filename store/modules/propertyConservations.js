export const state = () => ({
	propertyConservations: [],
})

export const actions = {
	async getPropertyConservations(context) {
		const { data } = await this.$propertyConservationService.getAll()
		context.commit('SET_PROPERTY_CONSERVATIONS', data.propertyConservations)
	},
}

export const mutations = {
	SET_PROPERTY_CONSERVATIONS(state, value) {
		state.propertyConservations = value
	},
}
