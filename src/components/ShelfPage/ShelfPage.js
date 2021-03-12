import React, { useEffect, useState } from 'react';
import ShelfPageForm from '../ShelfPageForm/ShelfPageForm';
import { useDispatch, useSelector } from 'react-redux';

import EditPopUp from '../EditPopUp/EditPopUp';

function ShelfPage() {
  const shelfItems = useSelector((store) => store.shelfItems);

  // Pop Up state
  const [openPopUp, setOpenPopUp] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_SHELF_ITEMS',
    });
  }, []);

  // const editShelf = (itemId) => {
  //   //breadcrumbs for testing and debugging
  //   console.log('*** <ShelfPage /> editShelf() ***');
  //   console.log('\titemId:', itemId);

  //   // dispatch({
  //   //   type:
  //   // });
  // };

  return (
    <div className="container">
      <ShelfPageForm />
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <ul>
        {shelfItems.map((item) => {
          return (
            <li key={item.id}>
              <img src={item.image_url} alt={item.description} />
              <p>{item.description}</p>

              {/* Edit Button */}
              <button onClick={() => setOpenPopUp(true)}>Edit</button>

              {/* Delete Button */}
              <button>Delete</button>
            </li>
          );
        })}
      </ul>
      <EditPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />
    </div>
  );
}

export default ShelfPage;
