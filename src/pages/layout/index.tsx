/**
 *  Created by pw on 2020/11/11 11:30 下午.
 */
import React, { Dispatch, useEffect, useReducer } from 'react';
import { history } from 'umi';
import './layout-wrapper.less';
import Header from '@/components/header/Header';
import Footer from '@/pages/home/Footer';
import Quickavigation from '@/components/quicknavigation';
import { Action } from '@/reducer/define';
import {
  AppActionType,
  AppState,
  initialState,
  reducer,
} from '@/reducer/appReducer';

const { environment } = process.env;

export const AppContext = React.createContext(
  {} as {
    state: AppState;
    dispatch: Dispatch<Action<AppActionType, AppState>>;
  },
);

export default function(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (location.pathname === '/') {
      history.push('/');
    }
  }, []);
  console.log(props.children);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="layout-wrapper">
        {environment !== 'pre' ? <Header /> : null}
        <div className="layout-content">{props.children}</div>
        {environment !== 'pre' ? <Footer /> : null}
        {environment !== 'pre' ? <Quickavigation /> : null}
      </div>
    </AppContext.Provider>
  );
}
