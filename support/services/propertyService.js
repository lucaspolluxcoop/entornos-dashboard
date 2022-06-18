const propertyService = (api) => {
	return {
		url: 'properties',

		map(payload) {
			return {
				street: payload.street,
				number: payload.number,
				floor: payload.floor,
				apartment: payload.apartment,
				city_id: payload.cityId,
				neightbourhood: payload.neightbourhood,
				zip: payload.zip,
				property_identifier: payload.propertyIdentifier,
				owner_tax_id: payload.ownerTaxId,
				property_type_id: payload.propertyTypeId,
				property_zone_id: payload.propertyZoneId
			}
		},

		mapAntiquity(payload) {
			return {
				property_id: payload.propertyId,
				antiquity: payload.antiquity,
				property_conservation_id: payload.propertyConservationId,
				property_termination_id: payload.propertyTerminationId,
				delivered_painted: payload.deliveredPainted,
				property_maintenance_state_id: payload.propertyMaintenanceStateId,
			}
		},

		getAll(params) {
			return api.get('api/' + this.url, { params })
		},

		get(id) {
			return api.$get('api/' + this.url + '/' + id)
		},

		post(property) {
			return api.$post('api/' + this.url, this.map(property))
		},

		patch(property) {
			return api.$patch('api/' + this.url + '/' + property.id, this.map(property))
		},

		delete(id) {
			return api.$delete('api/' + this.url + '/' + id)
		},

		addAmmenities(propertyWithAmmenity) {
			return api.$post('api/' + this.url + '/' + propertyWithAmmenity.propertyId + '/ammenities', propertyWithAmmenity.propertyAmmenities)
		},

		addServices(propertyWithServices) {
			return api.$post('api/' + this.url + '/' + propertyWithServices.propertyId + '/services', propertyWithServices.propertyServices)
		},

		addAntiquity(propertyWithAntiquity) {
			return api.$post('api/' + this.url + '/' + propertyWithAntiquity.propertyId + '/antiquity', this.mapAntiquity(propertyWithAntiquity))
		}
	}
}

export default propertyService
