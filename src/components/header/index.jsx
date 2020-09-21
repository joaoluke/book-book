import React from "react";
import "antd/dist/antd.css";
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../../redux/actions'

import { HeaderStyled, StyledHeaderContainer, HeaderStyledTitle, StyledHeaderText } from "../styles/styles";

const HeaderBookBook = ({ doLogout, doBusca, doTimeline, doPrateleiras, doProfile }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <HeaderStyled>
      <HeaderStyledTitle>
        BookBook
      </HeaderStyledTitle>
      <StyledHeaderContainer>
        <StyledHeaderText onClick={() => history.push("/timeline")} key="3">
          Timeline
          </StyledHeaderText>
        <StyledHeaderText onClick={() => history.push("/busca")} key="2">
          Buscar livros
       </StyledHeaderText>
        <StyledHeaderText onClick={() => history.push("/prateleiras")}>
          Sua prateleira
        </StyledHeaderText>
        <StyledHeaderText onClick={() => history.push("/profile")}>
          Perfil
        </StyledHeaderText>
        <StyledHeaderText onClick={() => {
          dispatch(logout());
          history.push("/");
        }}>
          Sair
          </StyledHeaderText>
      </StyledHeaderContainer>
    </HeaderStyled>
  );
};

export default HeaderBookBook;
