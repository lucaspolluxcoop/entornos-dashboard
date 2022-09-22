const notificationsService = (api) => {
	return {
		url: 'notifications',

		map(payload) {
			return {
				date: payload.date,
				notification_management_id: payload.notificationManagementId,
				notification_reason_id: payload.notificationReasonId,
				notification_response_id: payload.notificationResponseId,
				contract_id: payload.contractId,
				user_id: payload.userId
			}
		},

		post(notification) {
			return api.$post('api/' + this.url, this.map(notification))
		},
	}
}

export default notificationsService
