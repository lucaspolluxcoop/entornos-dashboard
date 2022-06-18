const contractNotificationResponseService = (api) => {
  return {
    url: 'contract-notification-responses',

    getAll() {
      return api.$get('api/' + this.url)
    }
  }
}

export default contractNotificationResponseService
