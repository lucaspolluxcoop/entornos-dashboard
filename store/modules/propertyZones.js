export const state = () => ({
	propertyZones: [],
	zonesByPropertyTypes: []
})

export const actions = {
	async getPropertyZones(context) {
		const { data } = await this.$propertyZoneService.getAll()
		context.commit('SET_PROPERTY_ZONES', data.propertyZones)
	},
}

export const mutations = {
	SET_PROPERTY_ZONES(state, value) {
		state.propertyZones = value
	},
	SET_ZONES_BY_PROPERTY_TYPES(state, value) {
		state.zonesByPropertyTypes = value
	}
}
