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

function* fetchShelfItems() {
  try {
    let shelfItems = yield axios.get('/api/shelf');

    yield put({
      type: 'SET_SHELF_ITEMS',
      payload: shelfItems.data,
    });
  } catch (err) {
    console.log('There was an error fetching shelfItems.', err);
  }
} // end fetchShelfItems

function* deleteShelfItem(action) {
  try {
    // action.payload = itemId
    yield axios.delete(`/api/shelf/${action.payload}`);

    yield put({ type: 'FETCH_SHELF_ITEMS' });
  } catch (err) {
    console.log(`Error deleting item ${action.payload}`, err);
  }
} // end deleteShelfItem

function* updateShelfItem(action) {
  console.log('UPDATESHELF SAGA');
  try{
    yield axios.put(`/api/shelf/${action.payload.id}`, {
      description: action.payload.description, 
      image_url: action.payload.image_url 
    });

    yield put({ type: 'FETCH_SHELF_ITEMS' });
  } catch{

  }
} // end updateShelfItem

function* shelfItemSaga() {
  yield takeLatest('FETCH_SHELF_ITEMS', fetchShelfItems);

  yield takeLatest('SET_NEW_ITEM', setNewItem);

  yield takeLatest('DELETE_SHELF_ITEM', deleteShelfItem);

  yield takeLatest('UPDATE_ITEM', updateShelfItem);
}

export default shelfItemSaga;
