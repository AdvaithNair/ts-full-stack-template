import React, { useContext } from 'react';
import BasicAppBar from '../BasicAppBar';
import { ReducerContext } from '@app/common';
import { UserContext } from '../../context/context';

const MainPage = () => {
  const { state } = useContext<ReducerContext>(UserContext);

  return (
    <div>
      <BasicAppBar
        buttonText={`Welcome Back, ${state.user.username}`}
        route={'/signIn'}
        title={'INSERT TITLE HERE'}
      />
    </div>
  );
};

export default MainPage;
