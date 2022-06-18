const propertyConservationService = (api) => {
	return {
		url: 'property-conservations',

		getAll() {
			return api.$get('api/' + this.url)
		},
	}
}

export default propertyConservationService
