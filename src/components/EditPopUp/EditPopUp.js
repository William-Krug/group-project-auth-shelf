/* Import Libraries */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* Import Material-UI*/
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,

} from '@material-ui/core'

function EditPopUp({item}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editDescription, setEditDescription] = useState(item.description);
  const [editImageUrl, setEditImageURl] = useState(item.image_url);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    console.log('in update');
    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        description: editDescription,
        image_url: editImageUrl,
        id: item.id
      }
    });

    handleClose();
  }

  return (
    <>
      {/* EDIT BUTTON  */}
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>

      {/* Dialog (POPUP) */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Shelf Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Feel free to edit your shelf ITem
          </DialogContentText>

          <TextField
            value={editImageUrl}
            onChange={(event) => setEditImageURl(event.target.value)}
            autoFocus
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
          />

          <TextField
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
          />

       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditPopUp;
