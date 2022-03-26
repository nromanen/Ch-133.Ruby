import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts(props) {
  return (
      <Alert severity={props.type}>
        {props.text}
      </Alert>
  );
}
