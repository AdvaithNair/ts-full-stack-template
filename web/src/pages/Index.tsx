import { ReducerContext, COLORS } from '@app/common';
import React, { useContext, useEffect } from 'react';
import Home from '../components/Home/Home';
import Landing from '../components/Landing/Landing';
import Loading from '../components/Loading/Loading';
import { UserContext } from '../context/context';

const Index: React.FC = () => {
  const { state } = useContext<ReducerContext>(UserContext);



  return (
    <div>
      {state.loading && <Loading />}
      {state.authenticated ? <Home /> : <Landing />}
    </div>
  );
};

export default Index;
