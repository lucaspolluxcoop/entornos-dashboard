export const state = () => ({
	propertyTypes: [],
	propertyAmmenities: []
})

export const actions = {
	async getPropertyTypes(context) {
		const { data } = await this.$propertyTypeService.getAll()
		context.commit('SET_PROPERTY_TYPES', data.propertyTypes)
	},

	async getPropertyAmmenities(context, propertyTypeId) {
		const { data } = await this.$propertyTypeService.getAmmenities(propertyTypeId)
		context.commit('SET_PROPERTY_AMMENITIES', data.propertyAmmenities)
	}
}

export const mutations = {
	SET_PROPERTY_TYPES(state, value) {
		state.propertyTypes = value
	},
	SET_PROPERTY_AMMENITIES(state, value) {
		state.propertyAmmenities = value
	}
}
