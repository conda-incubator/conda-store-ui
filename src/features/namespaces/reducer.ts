import { Namespace } from "src/common/models";

export enum ActionTypes {
  DATA_FETCHED = "namespaces/data_fetched",
}

interface IInitialState {
  page: number;
  data: Namespace[];
  count: number;
}

type Action = {
  type: ActionTypes.DATA_FETCHED;
  payload: { data: Namespace[]; count: number };
};

export const initialState: IInitialState = {
  page: 1,
  data: [],
  count: 0,
};

export const namespacesReducer = (state: IInitialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.DATA_FETCHED: {
      const { count, data } = action.payload;

      return { ...state, count: count, data: data };
    }
  }
};
