import { Environment } from "src/common/models";

export enum ActionTypes {
  DATA_FETCHED = "environments/data_fetched",
  SEARCHED = "environments/searched",
  NEXT_FETCHED = "environments/next_fetched"
}

interface IInitialState {
  page: number;
  data: Environment[];
  count: number;
  search: string;
}

type Action =
  | {
      type: ActionTypes.DATA_FETCHED;
      payload: { data: Environment[]; count: number };
    }
  | {
      type: ActionTypes.SEARCHED;
      payload: { data: Environment[]; count: number; search: string };
    }
  | {
      type: ActionTypes.NEXT_FETCHED;
      payload: { data: Environment[]; count: number };
    };

export const initialState: IInitialState = {
  page: 1,
  data: [],
  count: 0,
  search: ""
};

export const environmentsReducer = (state: IInitialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.DATA_FETCHED: {
      const { count, data } = action.payload;

      return { ...state, count: count, data: data };
    }

    case ActionTypes.SEARCHED: {
      return { ...action.payload, page: 1 };
    }

    case ActionTypes.NEXT_FETCHED: {
      const { data, count } = action.payload;

      const newData = state.data?.concat(data);
      const nextPage = state.page + 1;

      return {
        ...state,
        data: newData,
        count: count,
        page: nextPage
      };
    }
  }
};
