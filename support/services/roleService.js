const roleService = (api) => {
	return {
		url: 'roles',

		getAll() {
			return api.$get('api/' + this.url)
		},
	}
}

export default roleService
