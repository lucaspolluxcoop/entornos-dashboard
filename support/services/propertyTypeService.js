const propertyTypeService = (api) => {
	return {
		url: 'property-types',

		getAll() {
			return api.$get('api/' + this.url)
		},
	}
}

export default propertyTypeService
