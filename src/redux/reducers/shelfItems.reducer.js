import { combineReducers } from 'redux';


// Reducer for our shelf items.
const shelfItems = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SHELF_ITEMS':
      return action.payload;
    default: 
      return state;
  }
} // end shelfItems


export default shelfItems;