import React from 'react';
import { Action } from '@/reducer/define';

export enum AppActionType {
  OpenSign,
}

export interface AppState {
  showSign: boolean;
}

export const initialState: AppState = {
  showSign: false,
};

export const reducer: React.Reducer<
  AppState,
  Action<AppActionType, AppState>
> = (state: AppState, action: Action<AppActionType, AppState>) => {
  switch (action.type) {
    case AppActionType.OpenSign:
      return {
        ...state,
        showSign: action.payload.showSign ?? false,
      };
    default:
      return { ...state, ...action.payload };
  }
};
