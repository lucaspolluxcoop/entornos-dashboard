const revisionUserService = (api) => {
  return {
    url: 'revision-users',

    getAll(params) {
      return api.get('api/' + this.url, { params })
    },
  }
}

export default revisionUserService
