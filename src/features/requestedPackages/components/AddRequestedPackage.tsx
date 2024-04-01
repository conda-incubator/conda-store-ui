import React, { useMemo, useReducer } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { StyledIconButton } from "../../../styles";
import { useLazyGetPackageSuggestionsQuery } from "../requestedPackagesApiSlice";
import { debounce } from "lodash";
import { matchSorter } from "match-sorter";
import { CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ActionTypes,
  initialState,
  requestedPackagesReducer
} from "../reducer";
import { DeleteIconAlt } from "../../../components";

interface IAddRequestedPackageProps {
  /**
   * @param onCancel handler that will run when delete icon is clicked
   * @param onSubmit handler that will run when input losses focus
   * @param isCreating notify the component if it's being used for creating or editing environment
   */
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (packageName: string) => void;
  isCreating: boolean;
}

export const AddRequestedPackage = ({
  onCancel,
  onSubmit,
  isCreating
}: IAddRequestedPackageProps) => {
  const size = 100;
  const theme = useTheme();
  const [state, dispatch] = useReducer(requestedPackagesReducer, initialState);

  const [triggerQuery] = useLazyGetPackageSuggestionsQuery();

  const uniquePackageNamesList = useMemo(() => {
    const packageNames = new Set();
    const result: string[] = [];

    state.data.forEach(buildPackage => {
      const packageName = buildPackage.name;
      const hasPackageName = packageNames.has(packageName);

      if (!hasPackageName) {
        result.push(packageName);
        packageNames.add(packageName);
      }
    });

    return matchSorter(result, state.name);
  }, [state.data]);

  const handleSubmit = (value: string | null) => {
    if (value) {
      onSubmit(value);
      onCancel(false);
    }
  };

  const handleSearch = debounce(async (value: string) => {
    // Wait for at least two characters before calling the endpoint
    if (value.length < 2) {
      return;
    }

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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "15px",
        width: isCreating ? 330 : "100%"
      }}
    >
      <Box>
        <Autocomplete
          freeSolo
          selectOnFocus
          sx={{ width: "140px", color: theme.palette.secondary.main }}
          options={uniquePackageNamesList}
          onChange={(event, value) => handleSubmit(value)}
          ListboxProps={{
            onScroll: handleScroll
          }}
          onInputChange={(event, value, reason) => {
            if (reason === "clear") {
              dispatch({ type: ActionTypes.CLEARED });
              return;
            }
            handleSearch(value);
          }}
          renderInput={params => (
            <TextField
              label="Enter package"
              autoFocus
              {...params}
              size="small"
              sx={{ borderColor: theme.palette.secondary.main }}
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
            />
          )}
        />
      </Box>
      <Box
        sx={{
          marginRight: "16px"
        }}
      >
        <StyledIconButton
          onClick={() => onCancel(false)}
          data-testid="cancelIcon"
        >
          <DeleteIconAlt />
        </StyledIconButton>
      </Box>
    </Box>
  );
};
