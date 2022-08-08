import React from "react";
import { useAppSelector } from "src/hooks";
import { SpecificationEdit } from "./SpecificationEdit";
import { SpecificationReadOnly } from "./SpecificationReadOnly";

export const Specification = () => {
  const { mode } = useAppSelector(state => state.environmentDetails);

  return (
    <div>
      {mode === "read-only" && <SpecificationReadOnly />}
      {mode === "edit" && <SpecificationEdit />}
    </div>
  );
};
