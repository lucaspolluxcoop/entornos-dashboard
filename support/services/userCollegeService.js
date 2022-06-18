const userCollegeService = (api) => {
  return {
    url: 'users-colleges',

    getAll() {
      return api.$get('api/' + this.url)
    },
  }
}

export default userCollegeService
