export const state = () => ({
	states: [],
})

export const actions = {
	async getStates(context) {
		const { data } = await this.$stateService.getAll()
		context.commit('SET_STATES', data.states)
	},
}

export const mutations = {
	SET_STATES(state, value) {
		state.states = value
	},
}
