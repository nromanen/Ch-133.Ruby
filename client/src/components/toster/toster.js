import React, {useState, useEffect} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function InstantMessaging (props) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(props.open)
  }, [props]);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity={props.type}
          style={{
            backgroundColor: '#ffffff',
          }}
        >
          {props.text}
        </Alert>
      </Snackbar>
    </>
  );
}
