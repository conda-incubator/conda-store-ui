import { BuildPackage } from "src/common/models";

export enum ActionTypes {
  DATA_FETCHED = "requestedPackages/data_fetched",
  SEARCHED = "requestedPackages/searched",
  NEXT_FETCHED = "requestedPackages/next_fetched",
  LOADING = "requestedPackages/loading",
  CLEARED = "requestedPackages/cleared",
  FETCH_MORE = "requestedPackages/fetch_more",
  DATA_FIlTERED = "requestedPackages/data_filtered"
}

interface IInitialState {
  page: number;
  data: BuildPackage[];
  count: number;
  name: string;
  loading: boolean;
  results: string[];
}

type Action =
  | {
      type: ActionTypes.DATA_FETCHED;
      payload: { data: BuildPackage[]; count: number };
    }
  | {
      type: ActionTypes.SEARCHED;
      payload: { data: BuildPackage[]; count: number; name: string };
    }
  | {
      type: ActionTypes.NEXT_FETCHED;
      payload: { data: BuildPackage[]; count: number };
    }
  | {
      type: ActionTypes.LOADING;
      payload: { loading: boolean };
    }
  | { type: ActionTypes.CLEARED }
  | { type: ActionTypes.DATA_FIlTERED; payload: { results: string[] } }
  | {
      type: ActionTypes.FETCH_MORE;
      payload: { data: BuildPackage[]; page: number };
    };

export const initialState: IInitialState = {
  page: 1,
  data: [],
  count: 0,
  name: "",
  loading: false,
  results: []
};

export const requestedPackagesReducer = (
  state: IInitialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.DATA_FETCHED: {
      const { count, data } = action.payload;

      return { ...state, count: count, data: data };
    }

    case ActionTypes.SEARCHED: {
      return { ...state, ...action.payload, page: 1 };
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

    case ActionTypes.LOADING: {
      return {
        ...state,
        loading: action.payload.loading
      };
    }

    case ActionTypes.CLEARED: {
      return {
        ...state,
        name: "",
        page: 1
      };
    }

    case ActionTypes.DATA_FIlTERED: {
      return {
        ...state,
        results: action.payload.results
      };
    }

    case ActionTypes.FETCH_MORE: {
      return {
        ...state,
        data: action.payload.data,
        page: action.payload.page
      };
    }
  }
};
