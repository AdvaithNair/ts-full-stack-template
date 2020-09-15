import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading: React.FC = () => {
  return (
    <div className={'loading-body'}>
      <div className={'loading'}>
        <CircularProgress size={100} color={'secondary'} />
      </div>
    </div>
  );
};

export default Loading;
