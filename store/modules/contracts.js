export const state = () => ({
  contracts: [],
  users: [],
  warranties: [],
  contract: null,
  meta: [],
  contractParts: []
})

export const getters = {
  contractsTotal(state) {
    return state.meta ? state.meta.total : 0
  }
}

export const actions = {
  async getContracts(context, params) {
    const { data } = await this.$contractService.getAll(params)
    context.commit('SET_CONTRACTS', data.data.contracts)
    context.commit('SET_META', data.meta)
  },

  async getContract(context, contractId) {
    const { data } = await this.$contractService.get(contractId)
    context.commit('SET_CONTRACT', data)
  },

  async createContract(context, contract) {
    const { data } = await this.$contractService.post(contract)
    context.commit('SET_CONTRACT', data)
  },

  async updateContract(context, contract) {
    const { data } = await this.$contractService.patch(contract)
    context.commit('SET_CONTRACT', data)
  },

  async deleteContract(context, contractId) {
    await this.$contractService.delete(contractId)
  },

  async getContractParts(context, contractId) {
    const { data } = await this.$contractService.getContractParts(contractId)
    context.commit('SET_CONTRACT_PARTS', data.users)
  },

  async completeContract(context, contract) {
    await this.$contractExtintionService.patch(contract)
  }
}

export const mutations = {
  SET_CONTRACTS(state, contracts) {
    state.contracts = contracts
  },
  SET_CONTRACT(state, contract) {
    state.contract = contract
  },
  SET_CONTRACT_PARTS(state, parts) {
    state.contractParts = parts
  },
  SET_META(state, meta) {
    state.meta = meta
  },
  ADD_NEW_USER(state, user) {
    state.users.push(user)
  },
  ADD_NEW_WARRANTY(state, warranty) {
    state.warranties.push(warranty)
  }
}
