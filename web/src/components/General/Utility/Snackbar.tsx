import React, { useState } from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';

interface Props {
  openStr: string;
}

const CustomSnackbar: React.FC<Props> = ({ openStr }) => {
  const [open, setOpen] = useState<string>(openStr);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen('');
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={Boolean(open)}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <SnackbarContent
        style={{
          backgroundColor: '#cc0000'
        }}
        message={<span id='client-snackbar'>{open}</span>}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
