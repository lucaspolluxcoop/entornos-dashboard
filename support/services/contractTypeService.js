const contractTypeService = (api) => {
  return {
    url: 'contract-types',

    getAll() {
      return api.$get('api/' + this.url)
    }
  }
}

export default contractTypeService
