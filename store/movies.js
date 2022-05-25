export const state = () => ({
    query:''
})

export const getters = {
    searchQuery(state) {
        return state.query;
    }
}
export const mutations = {
    STORE_QUERY(state, query) {
        state.query = query
      },
      CLEAR_QUERY(state) {
          console.log('clear');
          state.query = ''
      },
}
  export const actions = {
    storeQuery({commit}, query) {
        commit('STORE_QUERY', query)
    },
    clearQuery({commit}) {
          commit('CLEAR_QUERY')
    },    
}