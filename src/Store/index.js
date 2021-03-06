import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import reducer from './reducer'

const initialState = {
  activeVCCName: null,
  activeVCCPath: null,
  activeVCCType: null,
  activeVCCValue: null,
  appIsRefreshing: false,
  appURL: null,
  deviceMode: 'desktop',
  isRemixing: false,
  messageLog: [],
  postMessage() {},
  profileImage: 'https://jiro-profile-pictures.imgix.net/4784537361_1596432327276.com/a-/AOh14GjTFPyKDB0LBPOJwNYMwui4lPkNvHkru3bAwP7_lA?w=126',
  tags: 'these, are, tags',
  username: 'diddy',
  vccValues: {},
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
};

Store.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const Context = createContext(initialState);

export default Store;