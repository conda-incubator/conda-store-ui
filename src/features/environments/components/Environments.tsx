import React, { memo, useEffect, useReducer } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import useTheme from "@mui/material/styles/useTheme";
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
import {
  isNamespaceListed,
  checkMyPrimaryNamespace,
  namespacesPermissionsMapper
} from "../../../utils/helpers/namespaces";
import { Namespace } from "../../../common/models";
import { BookIcon } from "../../../components";

export interface IBaseEnvironments {
  refreshEnvironments: boolean;
  onUpdateRefreshEnvironments: (isUpdated: boolean) => void;
}

const BaseEnvironments = ({
  refreshEnvironments,
  onUpdateRefreshEnvironments
}: IBaseEnvironments) => {
  const size = 100;
  const { palette } = useTheme();
  const version: string = process.env.REACT_APP_VERSION as string;
  const [state, dispatch] = useReducer(environmentsReducer, initialState);
  const [stateN, dispatchN] = useReducer(namespacesReducer, NInitialState);

  const [triggerNamespacesQuery] = useLazyFetchNamespacesQuery();
  const [triggerPrimaryNamespace] = useLazyFetchPrimaryNamespaceQuery();
  const [triggerQuery] = useLazyFetchEnvironmentsQuery();

  const getNamespaces = async () => {
    const { data: namespacesData } = await triggerNamespacesQuery({
      page: stateN.page,
      size
    });

    if (namespacesData) {
      const { primaryNamespace, namespaces } = await getNamespacesData(
        namespacesData.data
      );

      dispatchN({
        type: NActionTypes.DATA_FETCHED,
        payload: {
          data: !isNamespaceListed(namespaces, primaryNamespace)
            ? [...namespaces, { ...primaryNamespace, isPrimary: true }]
            : checkMyPrimaryNamespace(namespaces, primaryNamespace),
          count: namespacesData.count
        }
      });
      await getEnvironments();
    }
  };

  const getNamespacesData = async (namespaces: Namespace[]) => {
    try {
      const { data: permissions } = await triggerPrimaryNamespace();
      const namespacesWithPermissions = namespacesPermissionsMapper(
        namespaces,
        permissions
      );

      return {
        namespaces: namespacesWithPermissions,
        primaryNamespace: {
          id: undefined, // API does not retrieve an ID if the namespace is empty
          name: permissions.data.primary_namespace,
          canCreate: true,
          canUpdate: true
        }
      };
    } catch (e) {
      return {
        namespaces: [],
        primaryNamespace: {
          id: undefined,
          name: "default",
          canCreate: true,
          canUpdate: true
        }
      };
    }
  };

  const getEnvironments = async () => {
    const { data: environmentsData } = await triggerQuery({
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
    const { data } = await triggerQuery({ search: value });

    if (data) {
      dispatch({
        type: ActionTypes.SEARCHED,
        payload: { data: data.data, count: data.count, search: value }
      });
    }
  }, 500);

  const next = async () => {
    const { data } = await triggerQuery({
      search: state.search
    });

    if (data) {
      dispatch({
        type: ActionTypes.NEXT_FETCHED,
        payload: { data: data.data, count: data.count }
      });
    }
  };

  useEffect(() => {
    (async () => {
      getNamespaces();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (refreshEnvironments) {
        getNamespaces();
        onUpdateRefreshEnvironments(false);
      }
    })();
  }, [refreshEnvironments]);

  return (
    <Box
      sx={{
        width: "100%",
        borderRight: `1px solid ${palette.secondary.light}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Box sx={{ borderBottom: `1px solid ${palette.secondary.light}` }}>
        <EnvironmentsSearch onChange={e => handleChange(e.target.value)} />
      </Box>
      <Box
        sx={{
          zIndex: "1",
          paddingTop: "15px",
          flex: 4,
          overflowY: "auto"
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
        bgcolor={palette.common.white}
        sx={{
          bottom: 5,
          padding: "3px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: palette.common.white
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "&:hover": {
              borderBottom: "1px solid"
            },
            "&:focus": {
              borderBottom: `1px solid ${palette.primary.main}`,
              backgroundColor: palette.primary[50],
              color: palette.primary[600]
            }
          }}
        >
          <BookIcon></BookIcon>
          <Link
            href={"https://conda.store/en/latest/"}
            color="secondary"
            underline="none"
            sx={{
              color: palette.secondary.main,
              fontWeight: 400,
              fontSize: "14px",
              marginLeft: "5px"
            }}
            target="_blank"
          >
            <Typography
              sx={{
                color: palette.secondary.main,
                fontWeight: 400,
                fontSize: "14px"
              }}
            >
              Read the docs!
            </Typography>
          </Link>
        </Box>
        <Typography
          sx={{
            color: palette.secondary.main,
            fontWeight: 400,
            fontSize: "14px",
            marginRight: "5px"
          }}
        >
          Version: {version}
        </Typography>
      </Box>
    </Box>
  );
};

export const Environments = memo(BaseEnvironments);
