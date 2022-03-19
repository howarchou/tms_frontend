export type Action<ActionType, State> = {
  type: ActionType;
  payload: Partial<State>;
};
