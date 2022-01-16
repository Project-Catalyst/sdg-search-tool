import proposals from '@/assets/data/proposals.json'

// initial state
const getDefaultState = () => ({
  all: [],
  proposals: proposals,
  activeFilters: {
    proposal_id: [],
    challenge: [],
    sdgs: [],
    related: false,
    indirect_related: false,
    funded: false
  }
})

const filtersAsLists = ['proposal_id', 'challenge', 'sdgs']
const filtersAsFlags = ['related', 'indirect_related', 'funded']

const state = getDefaultState()

// getters
const getters = {
  filteredProposals: (state, _, rootState, rootGetters) => {
    let proposals = state.proposals
    if (state.activeFilters.challenge.length > 0) {
      const challenges = rootGetters['filters/filterChallenges']
      proposals = proposals.filter(
        (el) => challenges.includes(el.category)
      )
    }
    if (state.activeFilters.proposal_id.length > 0) {
      const filterProposals = rootGetters['filters/filterProposals']
      proposals = proposals.filter(
        (el) => filterProposals.includes(el.id)
      )
    }
    if (state.activeFilters.sdgs.length > 0) {
      const filterSdgs = rootGetters['filters/filterSdgs']
      proposals = proposals.filter(
        (el) => {
          let intersection = el.goals.filter((goal) => filterSdgs.includes(goal)).length
          return (intersection > 0)
        }
      )
    }
    if (state.activeFilters.related) {
      proposals = proposals.filter((el) => el.sdg_related)
    }
    if (state.activeFilters.indirect_related) {
      proposals = proposals.filter((el) => el.sdg_indirect_rel)
    }
    if (state.activeFilters.funded) {
      proposals = proposals.filter((el) => el.status)
    }
    return proposals
  },
  filterChallenges: (state) => {
    return state.activeFilters.challenge.map((el) => el.value)
  },
  filterProposals: (state) => {
    return state.activeFilters.proposal_id.map((el) => el.value)
  },
  filterSdgs: (state) => {
    return state.activeFilters.sdgs.map((el) => el.value)
  },
  proposalsById: (state) => {
    let result = {}
    state.proposals.forEach(el => {
      result[el.id] = el
    })
    return result
  },
  getById: (state, _, rootState, rootGetters) => (id) => {
    let indexed = rootGetters['filters/proposalsById']
    return (indexed[id]) ? indexed[id] : {}
  },
}

// actions
const actions = {
}

// mutations
const mutations = {
  addFilter(state, {prop, value, label}) {
    if (filtersAsLists.indexOf(prop.key) > -1) {
      let filterValues = state.activeFilters[prop.key].map((el) => el.value)
      if (filterValues.indexOf(value) === -1) {
        state.activeFilters[prop.key].push({
          value,
          label,
          key: prop.key
        });
      }
    }
    if (filtersAsFlags.indexOf(prop) > -1) {
      state.activeFilters[prop] = value
    }
  },
  removeFilter(state, f) {
    if (filtersAsLists.indexOf(f.key) > -1) {
      const idx = state.activeFilters[f.key].indexOf(f);
      if (idx > -1) {
        state.activeFilters[f.key].splice(idx, 1);
      }
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
