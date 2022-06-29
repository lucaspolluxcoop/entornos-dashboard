const warrantyService = (api) => {
  return {
    url: 'warranties',

    map(payload) {
      return {
        warranty_type_id: payload.warrantyTypeId,
        user_id: payload.userId
      }
    },

    getAll(params) {
      return api.get('api/' + this.url, { params })
    },

    get(id) {
      return api.$get('api/' + this.url + '/' + id)
    },

    post(warranty) {
      return api.$post('api/' + this.url, this.map(warranty))
    },

    patch(warranty) {
      return api.$patch('api/' + this.url + '/' + warranty.id, this.map(warranty), { params: this.getHeaders })
    },

    delete(id) {
      return api.$delete('api/' + this.url + '/' + id)
    }
  }
}

export default warrantyService
