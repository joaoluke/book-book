import React from "react";
import "antd/dist/antd.css";
import { RiFileListFill } from "react-icons/ri"
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../../redux/actions'
import { Popover } from 'antd'
import {
  HeaderStyled,
  StyledHeaderContainer,
  HeaderStyledTitle,
  StyledHeaderText,
  StyledHeaderMediaFilter,
  StyledHeaderContainerMedia,
  StyledPopover,
  StyledPopoverContainer,
} from "../styles/styles";

import { HeaderStyled, StyledHeaderContainer, HeaderStyledTitle, StyledHeaderText } from "../styles/styles";

const HeaderBookBook = ({ doLogout, doBusca, doTimeline, doPrateleiras, doProfile }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const content = () => (
    <StyledPopoverContainer>
      <StyledPopover onClick={() => history.push("/busca")}>Busca</StyledPopover>
      <StyledPopover onClick={() => history.push("/timeline")}>Timeline</StyledPopover>
      <StyledPopover onClick={() => history.push("/prateleiras")}>Prateleiras</StyledPopover>
      <StyledPopover onClick={() => {
        dispatch(logout());
        history.push("/");
      }}>Log Out</StyledPopover>
    </StyledPopoverContainer>
  );

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
        </StyledHeaderMediaFilter>
      </StyledHeaderContainer>
    </HeaderStyled>
  );
};

export default HeaderBookBook;
