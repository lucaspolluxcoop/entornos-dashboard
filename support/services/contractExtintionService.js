const contractExtintionService = (api) => {
  return {
    url: 'contract-extintions',

    map(payload) {
      return {
        extintion_date: payload.extintionDate,
        reason: payload.reason
      }
    },

    patch(contract) {
      return api.$patch('api/' + this.url + '/' + contract.id, this.map(contract))
    }
  }
}

export default contractExtintionService
