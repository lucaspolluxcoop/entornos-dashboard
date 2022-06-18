const stateService = (api) => {
  return {
    url: 'states',

    getAll() {
      return api.$get('api/' + this.url)
    },
  }
}

export default stateService
