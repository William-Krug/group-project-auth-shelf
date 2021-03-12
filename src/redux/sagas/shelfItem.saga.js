/* Import Libraries */
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/* Saga gets form input and sends to db */
function* setNewItem(action) {
  // Breadcrumbs for testing and debugging
  console.log('*** Saga -> setNewItem() ***');
  console.log('\taction.payload:', action.payload);

  try {
    yield axios.post('/api/shelf', action.payload);

    // Update Shelf Items List
    yield put({ type: 'FETCH_SHELF_ITEMS' });
  } catch (error) {
    alert('Error during request. Please try again later.');
    console.log('setNewItem() ERROR:', error);
  }
}

function* shelfItemSaga() {
  yield takeLatest('SET_NEW_ITEM', setNewItem);
}

export default shelfItemSaga;
