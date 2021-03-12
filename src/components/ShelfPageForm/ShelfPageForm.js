/* Import Libraries */
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function ShelfPageForm() {
  const dispatch = useDispatch();

  // Store new item in local state to bundle up as an object
  // to be sent to Redux store
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');

  const addShelfItem = (event) => {
    // Keep page from refreshing
    event.preventDefault();

    // Breadcrumbs for testing and debugging
    console.log('*** in <ShelfPageForm /> addShelfItem() ***');
    console.log('\tnewDescription:', newDescription);
    console.log('\tnewImage:', newImage);

    // Send new shelf item to saga for DB storage
    dispatch({
      type: 'SET_NEW_ITEM',
      payload: {
        description: newDescription,
        image_url: newImage,
      },
    });
  };

  return (
    <>
      <h3>Add an item to the Shelf</h3>
      <form onSubmit={addShelfItem}>
        {/* Description input */}
        <label>
          Description:
          <input
            type="textarea"
            onChange={(event) => setNewDescription(event.target.value)}
          />
        </label>

        {/* Image URL input */}
        <label>
          Image URL:
          <input
            type="text"
            onChange={(event) => setNewImage(event.target.value)}
          />
        </label>
        <input type="submit" value="Add" />
      </form>
    </>
  );
}

export default ShelfPageForm;
