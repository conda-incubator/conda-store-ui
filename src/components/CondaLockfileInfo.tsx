import React from "react";

export const CondaLockfileInfo = () => (
  <details>
    <summary>Conda Lockfile Upload</summary>
    <p>
      We currently only support the{" "}
      <a
        href="https://conda.github.io/conda-lock/"
        target="_blank"
        rel="noreferrer"
      >
        Conda lockfile
      </a>{" "}
      format. Other lockfile formats (such as Poetry) are not supported.
    </p>
  </details>
);

export default CondaLockfileInfo;
