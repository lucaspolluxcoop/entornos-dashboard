const extintionReasonService = (api) => {
  return {
    url: 'extintion-reasons',

    getAll() {
      return api.$get('api/' + this.url)
    }
  }
}

export default extintionReasonService
