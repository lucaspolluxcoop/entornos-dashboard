const propertyZoneService = (api) => {
	return {
		url: 'property-zones',

		getAll() {
			return api.$get('api/' + this.url)
		},
	}
}

export default propertyZoneService
