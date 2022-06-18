const propertyMaintenanceStateService = (api) => {
  return {
    url: 'property-maintenance-states',

    getAll() {
      return api.$get('api/' + this.url)
    },
  }
}

export default propertyMaintenanceStateService
