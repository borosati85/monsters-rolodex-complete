import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

const Spinner = ({ isFetching, ...otherProps }) => {
  return isFetching ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : null;
};

export default Spinner;
