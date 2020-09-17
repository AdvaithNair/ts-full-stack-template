import React, { useContext } from 'react';
import BasicAppBar from '../BasicAppBar';
import { ReducerContext } from '@app/common';
import { UserContext } from '../../context/context';
import UserSettingsBox from "../UserChangeScreen/UserSettingsBox";

const MainPage = () => {
  const { state } = useContext<ReducerContext>(UserContext);

  return (
    <div>
      <BasicAppBar
        buttonText={`Welcome Back, ${state.user.firstName} ${state.user.lastName}`}
        route={''}
        title={'INSERT TITLE HERE'}
      />
      <UserSettingsBox />
    </div>
  );
};

export default MainPage;
