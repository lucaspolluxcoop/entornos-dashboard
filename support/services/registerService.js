const registerService = (api) => {
  return {
    url: 'users',

    async store(data) {
      return await api.post('api/' + this.url, data)
    },
  }
}

export default registerService