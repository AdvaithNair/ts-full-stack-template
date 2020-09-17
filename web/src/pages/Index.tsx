import { ReducerContext, COLORS } from '@app/common';
import React, { useContext, useEffect } from 'react';
import Home from '../components/Home/Home';
import Landing from '../components/Landing/Landing';
import Loading from '../components/Loading/Loading';
import { UserContext } from '../context/context';

const Index: React.FC = () => {
  const { state } = useContext<ReducerContext>(UserContext);

  useEffect(() => {
    if (state.authenticated) {
      let bubblyCanvas = document.querySelector("canvas");
      bubblyCanvas!.style.display = 'none';
      let backgroundStr = `linear-gradient(90deg, ${COLORS.PRIMARY} 45%, ${COLORS.SECONDARY} 100%)`;
      document.body.style.background = backgroundStr
    } else {
      (window as any).bubbly({
        colorStart: COLORS.BUBBLY_START,
        colorStop: COLORS.BUBBLY_STOP,
        bubbleFunc: () => `hsla(0, 100%, 50%, ${Math.random() * 0.25})`
      });
    }
  }, [state.authenticated]);



  return (
    <div>
      {state.loading && <Loading />}
      {state.authenticated ? <Home /> : <Landing />}
    </div>
  );
};

export default Index;
