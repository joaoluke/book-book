import styled from "styled-components";

import { List } from "antd";

export const ListAntd = styled(List)`
  background-color: white;
  align-self: center;
  align-items: flex-end;
  margin: auto;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 400px;
  max-width: 700px;
  margin-top: 7vh;
  margin-right: auto;
  margin-left: auto;

  h1 {
    font-weight: 600;
    font-family: Poppins;
    font-size: 3rem;
    margin-right: 80%;
    color: rgba(11, 7, 84, 0.85);
  }
  p {
    font-weight: 300;
    font-family: Poppins;
    font-size: 1.5rem;
    margin-right: 80%;
    color: #4951ec;
  }
`;

export const Header = styled.header`
  z-index: 3;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #4951ec;
  width: 100%;
  height: 8vh;
  font-family: Poppins;
  font-size: 1.5rem;
  h1 {
    padding-top: 2vh;
    color: rgba(255, 255, 255, 0.85);
    padding-left: 20%;
  }
`;
