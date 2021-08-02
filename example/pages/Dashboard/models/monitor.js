export default {
  namespace: 'monitor',

  state: {
    tags: [],
  },

  effects: {},

  reducers: {
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};
