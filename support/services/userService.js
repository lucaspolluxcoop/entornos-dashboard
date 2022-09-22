const userService = (api) => {
  return {
    url: 'users',

    map(payload) {
      return {
        email: payload.email,
        role_id: payload.roleId,
        profile: {
          first_name: payload.profile.firstName,
          last_name: payload.profile.lastName,
          denomination: payload.profile.denomination,
          district: payload.profile.district,
          cuit: payload.profile.cuit,
          phone: payload.profile.phone,
          cell_phone: payload.profile.cellPhone,
          economic_activity_type_id: payload.profile.economicActivityTypeId,
          other_economic_activity_type_name: payload.profile.otherEconomicActivityTypeName,
          website: payload.profile.website,
          city_id: payload.profile.cityId,
          zip: payload.profile.zip,
          street: payload.profile.street,
          number: payload.profile.number,
          floor: payload.profile.floor,
          apartment: payload.profile.apartment,
          neighbourhood: payload.profile.neighbourhood,
          family_group_adults: payload.profile.familyGroupAdults,
          family_group_under_age: payload.profile.familyGroupUnderAge,
          nationality: payload.profile.nationality,
          plate: {
            number: payload.profile.plate.number,
            plate_state_id: payload.profile.plate.plateStateId,
            expiration_date: payload.profile.plate.expirationDate
          }
        },
      }
    },

    getAll(params) {
      return api.get('api/' + this.url, { params })
    },

    get(id) {
      return api.$get('api/' + this.url + '/' + id)
    },

    patch(user) {
      return api.$patch('api/' + this.url + '/' + user.id, this.map(user))
    },

    post(user) {
      return api.$post('api/' + this.url, this.map(user))
    },

    delete(id) {
      return api.$delete('api/' + this.url + '/' + id)
    },
  }
}

export default userService
