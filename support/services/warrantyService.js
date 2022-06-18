const warrantyService = (api) => {
  return {
    url: 'warranties',

    map(payload) {
      return {
        title: payload.title,
        description: payload.description,
        document: payload.document,
        warranty_type_id: payload.warrantyTypeId,
        user_id: payload.userId
      }
    },

    getHeaders() {
      return {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
    },

    getAll(params) {
      return api.get('api/' + this.url, { params })
    },

    get(id) {
      return api.$get('api/' + this.url + '/' + id)
    },

    post(warranty) {
      return api.$post('api/' + this.url, warranty, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
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
