import React from "react";
import { BeatLoader } from "react-spinners";
import styled from "styled-components";

const LoadingSpinner = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <SpinnerWrapper>
        <BeatLoader color="#9819c3" size={15} margin={10} />
      </SpinnerWrapper>
    );
  }

  return children;
};

export default LoadingSpinner;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
`;