export const state = () => ({
	roles: [],
})

export const actions = {
	async getRoles(context) {
		const { data } = await this.$roleService.getAll()
		context.commit('SET_ROLES', data.roles)
	},
}

export const mutations = {
	SET_ROLES(state, value) {
		state.roles = value
	},
}
