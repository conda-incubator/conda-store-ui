import React, { memo, useEffect, useReducer } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { EnvironmentsList } from "./EnvironmentsList";
import { debounce } from "lodash";
import { EnvironmentsSearch } from "./EnvironmentsSearch";
import { useLazyFetchEnvironmentsQuery } from "../environmentsApiSlice";
import { useLazyFetchNamespacesQuery } from "../../../features/namespaces";
import { ActionTypes, initialState, environmentsReducer } from "../reducer";
import {
  ActionTypes as NActionTypes,
  initialState as NInitialState,
  namespacesReducer
} from "../../../features/namespaces/reducer";
import { CondaLogo } from "../../../components";
import { useInterval } from "../../../utils/helpers";

const INTERVAL_REFRESHING = 2000;

export interface IBaseEnvironments {
  refreshEnvironments: boolean;
  onUpdateRefreshEnvironments: (isUpdated: boolean) => void;
}

const BaseEnvironments = ({
  refreshEnvironments,
  onUpdateRefreshEnvironments
}: IBaseEnvironments) => {
  const size = 100;
  const [state, dispatch] = useReducer(environmentsReducer, initialState);
  const [stateN, dispatchN] = useReducer(namespacesReducer, NInitialState);
  const {
    palette: { primary }
  } = useTheme();
  const [triggerNamespacesQuery] = useLazyFetchNamespacesQuery();
  const [triggerQuery] = useLazyFetchEnvironmentsQuery();

  const getNamespaces = async () => {
    const { data: namespacesData } = await triggerNamespacesQuery({
      page: stateN.page,
      size
    });

    if (namespacesData) {
      dispatchN({
        type: NActionTypes.DATA_FETCHED,
        payload: { data: namespacesData.data, count: namespacesData.count }
      });
    }
  };

  const getEnvironments = async () => {
    const { data: environmentsData } = await triggerQuery({
      page: state.page,
      size,
      search: state.search
    });

    if (environmentsData) {
      dispatch({
        type: ActionTypes.DATA_FETCHED,
        payload: { data: environmentsData.data, count: environmentsData.count }
      });
    }
  };

  const handleChange = debounce(async (value: string) => {
    const { data } = await triggerQuery({ page: 1, size, search: value });

    if (data) {
      dispatch({
        type: ActionTypes.SEARCHED,
        payload: { data: data.data, count: data.count, search: value }
      });
    }
  }, 500);

  const next = async () => {
    const { data } = await triggerQuery({
      page: state.page + 1,
      size,
      search: state.search
    });

    if (data) {
      dispatch({
        type: ActionTypes.NEXT_FETCHED,
        payload: { data: data.data, count: data.count }
      });
    }
  };

  useInterval(async () => {
    (async () => {
      getNamespaces();
      getEnvironments();
    })();
  }, INTERVAL_REFRESHING);

  useEffect(() => {
    (async () => {
      if (refreshEnvironments) {
        getEnvironments();
      }
      onUpdateRefreshEnvironments(false);
    })();
  }, [refreshEnvironments]);

  return (
    <Box
      sx={{
        width: "313px",
        position: "relative"
      }}
    >
      <Box sx={{ borderBottom: `1px solid ${primary.main}` }}>
        <EnvironmentsSearch onChange={e => handleChange(e.target.value)} />
      </Box>
      <Box>
        {state.data && (
          <EnvironmentsList
            next={next}
            hasMore={size * state.page < state.count}
            environmentsList={state.data}
            namespacesList={stateN.data}
            search={state.search}
          />
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          textAlign: "center",
          bottom: "20px"
        }}
      >
        <CondaLogo />
      </Box>
    </Box>
  );
};

export const Environments = memo(BaseEnvironments);
