import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef, useImperativeHandle } from "react";

const DeleteDialog = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setOpen(true);
    },
  }));

  const [open, setOpen] = React.useState(false);

  const handleClose = (deleteCategory) => {
    if (deleteCategory) {
      props.delete();
    }
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirme tou activity"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete Category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>N</Button>
          <Button onClick={() => handleClose(true)}>Y</Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default DeleteDialog;
