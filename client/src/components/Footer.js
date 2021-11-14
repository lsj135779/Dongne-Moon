import React, { useState } from "react";
import styled from "styled-components";

const FooterBox = styled.footer`
  height: 60px;
  width: 100%;
  background-color: #495057;
  bottom: 0px;
  position: absolute;
  div {
    text-align: center;
    padding-top: 20px;
  }
  .footer-title {
    color: white;
  }
`;
export default function Footer() {
  return (
    <FooterBox>
      <div className="footer-title">@Dongne Moon</div>
    </FooterBox>
  );
}
