const contractLocativeCanonService = (api) => {
  return {
    url: 'contract-locative-canons',

    getAll() {
      return api.$get('api/' + this.url)
    }
  }
}

export default contractLocativeCanonService
