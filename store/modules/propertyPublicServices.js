export const state = () => ({
	propertyPublicServices: [],
})

export const actions = {
	async getPropertyPublicServices(context) {
		const { data } = await this.$propertyPublicServiceService.getAll()
		context.commit('SET_PROPERTY_PUBLIC_SERVICES', data.propertyPublicServices)
	}
}

export const mutations = {
	SET_PROPERTY_PUBLIC_SERVICES(state, value) {
		state.propertyPublicServices = value
	}
}
