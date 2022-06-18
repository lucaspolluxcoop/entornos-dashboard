export const state = () => ({
	newUserRegistered: false
})

export const actions = {
	async create(context, data) {
		/* send register action to service */
		await this.$registerService.store(data)
		/* update store */
		context.commit('SET_NEW_USER', true)
	}
}

export const mutations = {
	SET_NEW_USER(state, value) {
		state.newUserRegistered = value
	}
}