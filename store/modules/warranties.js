export const state = () => ({
  warranties: [],
  warranty: null,
  meta: []
})

export const getters = {
  warrantiesTotal(state) {
    return state.meta ? state.meta.total : 0
  }
}

export const actions = {
  async getWarranties(context, params) {
    const { data } = await this.$warrantyService.getAll(params)
    context.commit('SET_WARRANTIES', data.data.warranties)
    context.commit('SET_META', data.meta)
  },

  async getWarranty(context, warrantyId) {
    const { data } = await this.$warrantyService.get(warrantyId)
    context.commit('SET_WARRANTY', data)
  },

  async createWarranty(context, warranty) {
    const { data } = await this.$warrantyService.post(warranty)
    context.commit('SET_WARRANTY', data)
  },

  async updateWarranty(context, warranty) {
    const { data } = await this.$warrantyService.patch(warranty)
    context.commit('SET_WARRANTY', data)
  },

  async deleteWarranty(context, warrantyId) {
    await this.$warrantyService.delete(warrantyId)
  }
}

export const mutations = {
  SET_WARRANTIES(state, value) {
    state.warranties = value
  },
  SET_WARRANTY(state, value) {
    state.warranty = value
  },
  SET_META(state, value) {
    state.meta = value
  },
  ADD_NEW_WARRANTY(state) {
    if (state.warranty) {
      state.warranties.push(state.warranty)
    }
  }
}
