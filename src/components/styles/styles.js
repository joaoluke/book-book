import styled from "styled-components";
import { 
  Input, 
  Typography, 
  Card, 
  List, 
  Form, 
  Button, 
  Modal,
  Item
} from "antd";


const { Search } = Input;
const { Title } = Typography;

export const ListAntd = styled(List)`
  background-color: white;
  align-self: center;
  align-items: flex-end;
  margin: auto;
`;

export const LoginHeader = styled.header`
  position: absolute;
  width: 82%;
  height: 34px;
  left: 10%;
  top: 29px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 36px;
  display: flex;
  align-items: center;
  color: rgba(124, 154, 242, 0.85);
`;


export const LoginButton = styled(Button)`
  width: 400px;
  background-color: #4951EC;
  color: #fff;
  margin-bottom: 0px !important; 
`;

export const LoginA = styled.a`
  color: #4951EC;
`;

export const LoginForm = styled(Form)`
  margin-top: -103px;
  width: 600px;
`;

export const LoginSlogan = styled.h1`
  text-align: right;
  position: absolute;
  right: 45px;
  margin-top: -252px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 39px;
  line-height: 64px;
  display: flex;
  align-items: center;
  color: rgba(11, 7, 84, 0.85);
`;

export const LoginImage = styled.img`
  height: 400px;
  width: 400px;
  margin: 25% auto;
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

export const StyledH1 = styled(Title)`
  color: #0b0754;
`;

export const StyledBodySearch = styled.div`
  width: 800px;
  margin: 100px auto;
`;

export const StyledInputSearch = styled(Search)`
  margin-top: 30px;
  width: 500px;
`;

export const StyledCardSearch = styled(Card)`
  margin: 60px auto;
`;

