const propertyPublicServiceService = (api) => {
	return {
		url: 'property-public-services',

		getAll() {
			return api.$get('api/' + this.url)
		},
	}
}

export default propertyPublicServiceService
