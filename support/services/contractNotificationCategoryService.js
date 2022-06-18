const contractNotificationCategoryService = (api) => {
  return {
    url: 'contract-notification-categories',

    getAll() {
      return api.$get('api/' + this.url)
    }
  }
}

export default contractNotificationCategoryService
