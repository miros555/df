// Reducer
const initialState = {
  list:[],
  loading: false,
  error: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'REQUESTED_SUCCEEDED':
      return {
        ...state,
        list:action.payload,
        loading: false,
        error: false
      };
    case 'REQUESTED_FAILED':
      return {
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

export default reducer;
