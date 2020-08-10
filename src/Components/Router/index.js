import React, { useContext } from 'react';

import DevTools from '../DevTools';
import Welcome from '../Welcome';

import { Context } from '../../Store';

const Router = () => {
  const [state] = useContext(Context);

  if (!state.appURL) {
    return (
      <Welcome />
    );
  }

  return <DevTools />;
};

export default Router;
