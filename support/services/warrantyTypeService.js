const warrantyTypeService = (api) => {
  return {
    url: 'warranty-types',

    getAll() {
      return api.$get('api/' + this.url)
    }
  }
}

export default warrantyTypeService
