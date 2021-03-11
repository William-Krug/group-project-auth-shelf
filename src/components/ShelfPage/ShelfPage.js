import React from 'react';
import ShelfPageForm from '../ShelfPageForm/ShelfPageForm';

function ShelfPage() {
  return (
    <div className="container">
      <ShelfPageForm />
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
