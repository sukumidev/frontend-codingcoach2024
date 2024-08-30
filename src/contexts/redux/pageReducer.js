// src/redux/reducers/pageReducer.js
const initialState = {
  currentPage: 'Dashboard', // Valor inicial por defecto
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

