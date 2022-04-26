import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function ActionAlerts(props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(true)
  }, []);

  if(open) {
    return (
      <Alert severity={props.type} onClose={() => {setOpen(false)}}>
        {props.text}
      </Alert>
    );
  } else {
    return(null);
  }
}
