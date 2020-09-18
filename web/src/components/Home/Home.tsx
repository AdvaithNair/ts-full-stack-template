import React, { useContext, useEffect } from 'react';
import BasicAppBar from '../BasicAppBar';
import { COLORS, ReducerContext } from '@app/common';
import { UserContext } from '../../context/context';
import UserSettingsBox from '../UserChangeScreen/UserSettingsBox';

const MainPage = () => {
  const { state } = useContext<ReducerContext>(UserContext);

  useEffect(() => {
    let bubblyCanvas = document.querySelector('canvas');
    bubblyCanvas!.style.display = 'none';
    let backgroundStr = `linear-gradient(90deg, ${COLORS.PRIMARY} 45%, ${COLORS.SECONDARY} 100%)`;
    document.body.style.background = backgroundStr;
  }, []);

  return (
    <div>
      <BasicAppBar
        buttonText={`Welcome Back, ${state.user.firstName}`}
        route={''}
        title={'INSERT TITLE HERE'}
      />
      <UserSettingsBox />
    </div>
  );
};

export default MainPage;
