const passwordService = (api) => {
  return {
    url: 'auth/',

    post(formData) {
      return api.$post(`${this.url}forgot-password`, formData)
    },
    reset(formData) {
      return api.$post(`${this.url}reset-password`, formData)
    },
  }
}

export default passwordService
