import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import {
  EnvironmentDetailsHeader,
  modeChanged,
  EnvironmentDetailsModes,
  useCreateOrUpdateMutation
} from "../../../features/environmentDetails";
import {
  currentBuildIdChanged,
  EnvMetadata,
  useLazyGetEnviromentBuildQuery
} from "../../../features/metadata";
import {
  environmentOpened,
  closeCreateNewEnvironmentTab,
  openCreateNewEnvironmentTab
} from "../../../features/tabs";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { SpecificationCreate, SpecificationReadOnly } from "./Specification";
import {
  descriptionChanged,
  nameChanged,
  startNewEnvironmentForm,
  clearNewEnvironmentForm
} from "../environmentCreateSlice";
import createLabel from "../../../common/config/labels";
import { showNotification } from "../../notification/notificationSlice";


export const EnvironmentCreate = () => {
  const dispatch = useAppDispatch();

  // Url routing params
  // If user loads the app at /<namespace_name>/new-environment
  // This will put the app in the correct state
  const { namespaceName = "" } = useParams<{
    namespaceName: string;
  }>();

  const environmentForm = useAppSelector(
    state => state.environmentCreate[`${namespaceName}/new-environment`]
  );

  useEffect(() => {
    if (namespaceName) {
      dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
      dispatch(openCreateNewEnvironmentTab(namespaceName));
      if (!environmentForm) {
        dispatch(startNewEnvironmentForm(`${namespaceName}/new-environment`));
      }
    }
  }, [namespaceName]);

  const navigate = useNavigate();

  const { mode } = useAppSelector(state => state.environmentDetails);
  const { name = "", description = "" } = environmentForm || {};
  const { newEnvironment } = useAppSelector(state => state.tabs);
  const [error, setError] = useState({
    message: "",
    visible: false
  });
  const [createOrUpdate] = useCreateOrUpdateMutation();
  const [triggerQuery] = useLazyGetEnviromentBuildQuery();

  const createEnvironment = async (yaml: string) => {
    const namespace = newEnvironment?.namespace;
    const environmentInfo = {
      namespace,
      specification:
        yaml.trimEnd() +
        `\ndescription: '${description}'\nname: ${name}\nprefix: null`
    };

    try {
      const { data } = await createOrUpdate(environmentInfo).unwrap();
      const { data: envInfo } = await triggerQuery(data.build_id);
      const newEnvId = envInfo?.data?.environment_id ?? data.build_id;

      const environment = {
        name,
        current_build: null,
        current_build_id: data.build_id,
        description,
        id: newEnvId,
        namespace: {
          id: data.build_id,
          name: namespace
        }
      };

      dispatch(modeChanged(EnvironmentDetailsModes.READ));
      dispatch(closeCreateNewEnvironmentTab());
      dispatch(
        environmentOpened({
          environment,
          canUpdate: true
        })
      );
      // After new environment has been created, navigate to the new environment's web page
      navigate(`/${namespace}/${name}`);
      dispatch(currentBuildIdChanged(data.build_id));
      dispatch(showNotification(createLabel(name, "create")));
    } catch (e) {
      setError({
        message: e?.data?.message ?? createLabel(undefined, "error"),
        visible: true
      });
    } finally {
      // clear form datha from app state
      dispatch(clearNewEnvironmentForm(`${namespaceName}/new-environment`));
    }
  };

  return (
    <Box sx={{ padding: "14px 12px" }}>
      <EnvironmentDetailsHeader
        envName={name}
        namespace={newEnvironment.namespace}
        onUpdateName={(value: string) => {
          dispatch(nameChanged([`${namespaceName}/new-environment`, value]));
        }}
        showEditButton={true}
      />
      {error.visible && (
        <Alert
          severity="error"
          sx={{
            mb: "20px"
          }}
        >
          {error.message}
        </Alert>
      )}
      <Box sx={{ marginBottom: "30px" }}>
        <EnvMetadata
          mode={mode}
          description={description}
          onUpdateDescription={(value: string) => {
            dispatch(
              descriptionChanged([`${namespaceName}/new-environment`, value])
            );
          }}
          onUpdateBuildId={() => {}}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        {mode === "read-only" && <SpecificationReadOnly />}
        {mode === "create" && (
          <SpecificationCreate
            namespaceName={namespaceName}
            onCreateEnvironment={createEnvironment}
          />
        )}
      </Box>
    </Box>
  );
};
