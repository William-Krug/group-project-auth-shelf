import React, { useEffect } from 'react';
import ShelfPageForm from '../ShelfPageForm/ShelfPageForm';
import { useDispatch } from 'react-redux';

function ShelfPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_SHELF_ITEMS'
    })
  }, []);
  
  return (
    <div className="container">
      <ShelfPageForm />
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <ul>
        <li>
          <img src="https://image.shutterstock.com/image-vector/trophy-cup-award-vector-icon-260nw-592525184.jpg" />
          <p>Description goes here</p>
          <button>Delete!</button>

        </li>
      </ul>

    </div>
  );
}

export default ShelfPage;
