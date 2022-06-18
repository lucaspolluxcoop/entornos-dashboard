const plateStateService = (api) => {
  return {
    url: 'plate-states',

    getAll() {
      return api.$get('api/' + this.url)
    }
  }
}

export default plateStateService
