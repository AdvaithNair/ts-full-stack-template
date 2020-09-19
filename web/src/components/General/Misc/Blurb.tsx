import Box from '@material-ui/core/Box';
import React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  headerText: string;
  dataText: string;
}

const Blurb: React.FC<Props> = ({ headerText, dataText }) => {
  return (
    <Box p={6} m={'auto'}>
      <Typography variant='h6'>{headerText}</Typography>
      <Typography variant='body2'>{dataText}</Typography>
    </Box>
  );
};

export default Blurb;
