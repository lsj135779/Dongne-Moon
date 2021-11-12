import React, { useState } from "react";
import styled from "styled-components";

const FooterBox = styled.footer`
  height: 60px;
  width: 100%;
  background: #ffdbc1;
  bottom: 0px;
  position: absolute;
  div {
    text-align: center;
    padding-top: 20px;
  }
`;
export default function Footer() {
  return (
    <FooterBox>
      <div>@Dongne Moon</div>
    </FooterBox>
  );
}
