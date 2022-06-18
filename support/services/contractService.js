const contractService = (api) => {
  return {
    url: 'contracts',

    map(payload) {
      return {
        start_contract: payload.startContract,
        end_contract: payload.endContract,
        contract_locative_canon_id: payload.contractLocativeCanonId,
        warranties: payload.warranties,
        property_id: payload.propertyId,
        contract_type_id: payload.contractTypeId,
        owner_id: payload.ownerId,
        tenant_id: payload.tenantId,
        locator_id: payload.locatorId
      }
    },

    getAll(params) {
      return api.get('api/' + this.url, { params })
    },

    get(id) {
      return api.$get('api/' + this.url + '/' + id)
    },

    post(contract) {
      return api.$post('api/' + this.url, this.map(contract))
    },

    patch(contract) {
      return api.$patch('api/' + this.url + '/' + contract.id, this.map(contract))
    },

    delete(id) {
      return api.$delete('api/' + this.url + '/' + id)
    },

    getContractParts(id) {
      return api.$get('api/contract-parts' + '/' + id)
    }
  }
}

export default contractService
