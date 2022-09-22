import React, { useEffect, useMemo, useReducer } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { StyledIconButton } from "src/styles";
import { useLazyGetPackageSuggestionsQuery } from "../requestedPackagesApiSlice";
import { debounce } from "lodash";
import { CircularProgress } from "@mui/material";
import {
  ActionTypes,
  initialState,
  requestedPackagesReducer
} from "../reducer";

interface IAddRequestedPackageProps {
  /**
   * @param onCancel handler that will run when delete icon is clicked
   * @param onSubmit handler that will run when input losses focus
   */
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (packageName: string) => void;
}

export const AddRequestedPackage = ({
  onCancel,
  onSubmit
}: IAddRequestedPackageProps) => {
  const size = 100;
  const [state, dispatch] = useReducer(requestedPackagesReducer, initialState);

  const [triggerQuery] = useLazyGetPackageSuggestionsQuery();

  const fetchMore = async () => {
    dispatch({ type: ActionTypes.LOADING, payload: { loading: true } });
    const nextPage = state.page + 1;

    const { data } = await triggerQuery({
      page: nextPage,
      size,
      search: state.name
    });

    if (data) {
      dispatch({
        type: ActionTypes.FETCH_MORE,
        payload: { data: data.data, page: nextPage }
      });
    }

    dispatch({ type: ActionTypes.LOADING, payload: { loading: false } });
  };

  const uniquePackageNamesList = useMemo(() => {
    const packageNames = new Set(state.results);
    const result: string[] = [...state.results];
    // console.log("uniquePackageNamesList ran");
    // console.log("list size", result.length);

    state.data.forEach(buildPackage => {
      const packageName = buildPackage.name;
      const hasPackageName = packageNames.has(packageName);

      if (!hasPackageName) {
        result.push(packageName);
        packageNames.add(packageName);
      }
    });

    dispatch({ type: ActionTypes.DATA_FIlTERED, payload: { results: result } });

    if (result.length < state.page * 10) {
      fetchMore();
      return [];
    }

    return result;
  }, [state.data]);

  const handleSubmit = () => {
    if (state.name) {
      onSubmit(state.name);
      onCancel(false);
    }
  };

  const handleSearch = debounce(async (value: string) => {
    dispatch({ type: ActionTypes.LOADING, payload: { loading: true } });

    const { data } = await triggerQuery({
      page: state.page,
      size,
      search: value
    });

    if (data) {
      dispatch({
        type: ActionTypes.SEARCHED,
        payload: { data: data.data, count: data.count, name: value }
      });
    }
    dispatch({ type: ActionTypes.LOADING, payload: { loading: false } });
  }, 200);

  const handleScroll = async (event: React.SyntheticEvent) => {
    const scrollOffset = 2;
    const listboxNode = event.currentTarget;

    if (
      listboxNode.scrollTop + listboxNode.clientHeight + scrollOffset >=
      listboxNode.scrollHeight
    ) {
      const hasMore = size * state.page <= state.count;

      if (!hasMore) {
        return;
      }

      dispatch({ type: ActionTypes.LOADING, payload: { loading: true } });
      const { data } = await triggerQuery({
        page: state.page + 1,
        size,
        search: state.name
      });

      if (data) {
        dispatch({
          type: ActionTypes.NEXT_FETCHED,
          payload: { data: data.data, count: data.count }
        });
      }

      dispatch({ type: ActionTypes.LOADING, payload: { loading: false } });
    }
  };

  useEffect(() => {
    (async () => {
      dispatch({ type: ActionTypes.LOADING, payload: { loading: true } });
      const { data } = await triggerQuery({
        page: state.page,
        search: "",
        size
      });

      if (data) {
        dispatch({
          type: ActionTypes.DATA_FETCHED,
          payload: { data: data.data, count: data.count }
        });
      }

      dispatch({ type: ActionTypes.LOADING, payload: { loading: false } });
    })();
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
      <Box sx={{ marginRight: "160px" }}>
        <Autocomplete
          onInputChange={(event, value, reason) => {
            if (reason === "clear") {
              dispatch({ type: ActionTypes.CLEARED });
              return;
            }

            handleSearch(value);
          }}
          freeSolo
          options={uniquePackageNamesList}
          sx={{ width: "140px" }}
          ListboxProps={{
            onScroll: handleScroll
          }}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {state.loading ? (
                      <CircularProgress
                        color="inherit"
                        size={10}
                        sx={{ marginRight: "7px" }}
                      />
                    ) : (
                      params.InputProps.endAdornment
                    )}
                  </React.Fragment>
                )
              }}
              label="Enter package"
              onBlur={handleSubmit}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "154px" }} />
          <StyledIconButton
            onClick={() => onCancel(false)}
            sx={{ marginLeft: "24px" }}
          >
            <DeleteIcon />
          </StyledIconButton>
        </Box>
      </Box>
    </Box>
  );
};
