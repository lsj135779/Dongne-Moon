import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoaderWrap = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Loader = ({ ref }) => {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#A593E0" ref={ref} />
    </LoaderWrap>
  );
};

export default Loader;
