const economicActivityTypeService = (api) => {
  return {
    url: 'economic-activity-types',

    getAll() {
      return api.$get('api/' + this.url)
    },
  }
}

export default economicActivityTypeService
