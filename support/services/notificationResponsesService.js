const notificationResponsesService = (api) => {
	return {
		url: 'notification-responses',

		getAll() {
			return api.$get('api/' + this.url)
		},
	}
}

export default notificationResponsesService
