import React, { memo, useEffect, useReducer } from "react";
import Box from "@mui/material/Box";
import { EnvironmentsList } from "./EnvironmentsList";
import { debounce } from "lodash";
import { EnvironmentsSearch } from "./EnvironmentsSearch";
import { useLazyFetchEnvironmentsQuery } from "../environmentsApiSlice";
import {
  useLazyFetchNamespacesQuery,
  useLazyFetchPrimaryNamespaceQuery
} from "../../../features/namespaces";
import { ActionTypes, initialState, environmentsReducer } from "../reducer";
import {
  ActionTypes as NActionTypes,
  initialState as NInitialState,
  namespacesReducer
} from "../../../features/namespaces/reducer";
import { CondaLogo } from "../../../components";
import { useInterval } from "../../../utils/helpers";
import {
  isNamespaceListed,
  checkMyPrimaryNamespace
} from "../../../utils/helpers/namespaces";

const INTERVAL_REFRESHING = 5000;

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

  const [triggerNamespacesQuery] = useLazyFetchNamespacesQuery();
  const [triggerPrimaryNamespace] = useLazyFetchPrimaryNamespaceQuery();
  const [triggerQuery] = useLazyFetchEnvironmentsQuery();

  const getNamespaces = async () => {
    const primaryNamespace = await getMyPrimaryNamespace();
    const { data: namespacesData } = await triggerNamespacesQuery({
      page: stateN.page,
      size
    });

    if (namespacesData) {
      dispatchN({
        type: NActionTypes.DATA_FETCHED,
        payload: {
          data: !isNamespaceListed(namespacesData.data, primaryNamespace)
            ? [...namespacesData.data, { ...primaryNamespace, isPrimary: true }]
            : checkMyPrimaryNamespace(namespacesData.data, primaryNamespace),
          count: namespacesData.count
        }
      });
    }
  };

  const getMyPrimaryNamespace = async () => {
    try {
      const { data: primaryNamespace } = await triggerPrimaryNamespace();
      return {
        id: undefined, // API does not retrieve an ID if the namespace is empty
        name: primaryNamespace.data.primary_namespace
      };
    } catch (e) {
      return {
        id: undefined,
        name: "default"
      };
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
      getEnvironments();
    })();
  }, INTERVAL_REFRESHING);

  useEffect(() => {
    (async () => {
      getNamespaces();
      if (refreshEnvironments) {
        getEnvironments();
      }
      onUpdateRefreshEnvironments(false);
    })();
  }, [refreshEnvironments]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        borderRight: "1px solid #E0E0E0"
      }}
    >
      <Box>
        <EnvironmentsSearch onChange={e => handleChange(e.target.value)} />
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: "1",
          paddingTop: "15px"
        }}
      >
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
          bottom: "20px",
          zIndex: "0"
        }}
      >
        <CondaLogo />
      </Box>
    </Box>
  );
};

export const Environments = memo(BaseEnvironments);
