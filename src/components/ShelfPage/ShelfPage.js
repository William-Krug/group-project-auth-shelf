import React, { useEffect } from 'react';
import ShelfPageForm from '../ShelfPageForm/ShelfPageForm';
import { useDispatch, useSelector } from 'react-redux';

function ShelfPage() {
  const shelfItems = useSelector(store => store.shelfItems);

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

        {shelfItems.map(item => {
          return(
            <li key={item.id}>
              <img src={item.image_url} alt={item.description} />
              <p>{item.description}</p> 
              <button>Delete</button>
            </li>
          );
        })}
      </ul>

    </div>
  );
}

export default ShelfPage;
