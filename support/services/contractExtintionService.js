const contractExtintionService = (api) => {
  return {
    url: 'contract-extintions',

    map(payload) {
      return {
        extintion_date: payload.extintionDate,
        extintion_reason_id: payload.extintionReasonId,
        other_reason: payload.otherReason,
      }
    },

    patch(contract) {
      return api.$patch('api/' + this.url + '/' + contract.id, this.map(contract))
    }
  }
}

export default contractExtintionService
