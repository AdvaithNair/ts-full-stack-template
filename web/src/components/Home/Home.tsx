import React from 'react';
import BasicAppBar from '../BasicAppBar';

const MainPage = () => {
  return (
    <div>
      <BasicAppBar
        buttonText={'Login'}
        route={'/signIn'}
        title={'INSERT TITLE HERE'}
      />
    </div>
  );
};

export default MainPage;
