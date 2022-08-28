const notificationTypesService = (api) => {
	return {
		url: 'notification-types',

		getAll() {
			return api.$get('api/' + this.url)
		},
	}
}

export default notificationTypesService
