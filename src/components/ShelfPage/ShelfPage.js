import React, { useEffect } from 'react';
import ShelfPageForm from '../ShelfPageForm/ShelfPageForm';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

function ShelfPage() {
  const shelfItems = useSelector(store => store.shelfItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_SHELF_ITEMS'
    })
  }, []);

  // handles delete button click
  const deleteItem = (itemId) => {
    console.log('item to delete:', itemId);
    // sweet alert will first check that the user wants to delete the item. 
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    // willDelete is kitty cat, first argument of the promise is a boolean when Okay is clicked
    .then((willDelete) => {
      console.log('willDelete', willDelete);
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }
  
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
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          );
        })}
      </ul>

    </div>
  );
}

export default ShelfPage;
