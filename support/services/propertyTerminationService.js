const propertyTerminationService = (api) => {
	return {
		url: 'property-terminations',

		getAll() {
			return api.$get('api/' + this.url)
		},
	}
}

export default propertyTerminationService
