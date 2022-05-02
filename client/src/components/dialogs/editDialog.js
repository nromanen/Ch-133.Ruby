import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef, useImperativeHandle } from "react";
import { useRef } from "react";
import "../../consts.js";
import EditCategory from './changeCategoryDialog';;

const EditDialog = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const ChangeRef = useRef();

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setOpen(true);
    },
  }));

  const handleClose = (changeCategory) => {
    if (changeCategory) {
      ChangeRef.current.changeCategory();
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Edit</DialogTitle>
        <DialogContent>
          <EditCategory id={props.id} ref={ChangeRef} change={props.change}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={() => handleClose(true)}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default EditDialog;
