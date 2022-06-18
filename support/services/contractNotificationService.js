const contractNotificationService = (api) => {
  return {
    url: 'contract-notifications',

    map(payload) {
      return {
        contract_notification_category_id: payload.contractNotificationCategoryId,
        contract_id: payload.contractId,
        notification_date: payload.notificationDate,
        response_date: payload.responseDate,
        contract_notification_response_id: payload.contractNotificationResponseId,
        first_part_id: payload.firstPartId,
        second_part_id: payload.secondPartId,
        reason_id: payload.reasonId
      }
    },

    getAll(params) {
      return api.$get('api/' + this.url, { params })
    },

    get(id) {
      return api.$get('api/' + this.url + '/' + id)
    },

    create(notification) {
      return api.$post('api/' + this.url, this.map(notification))
    },

    patch(notification) {
      return api.$patch('api/' + this.url + '/' + notification.id, this.map(notification))
    },

    delete(id) {
      return api.$delete('api/' + this.url + '/' + id)
    }
  }
}

export default contractNotificationService
