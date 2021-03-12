import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchShelfItems() {
  try{
    let shelfItems = yield axios.get('/api/shelf');

    yield put({
      type: 'SET_SHELF_ITEMS',
      payload: shelfItems.data
    })

  } catch (err) {
    console.log('There was an error fetching shelfItems.', err);
  }

} // end fetchShelfItems

function* watcherSaga() {
  yield takeLatest('FETCH_SHELF_ITEMS', fetchShelfItems);

};

export default watcherSaga;
