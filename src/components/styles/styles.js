import styled from "styled-components";
import { Input, Typography, Card } from "antd";
import { List, Form } from "antd";
import {
  Modal,
  Item,
  Button,
} from "antd";


const { Search } = Input;
const { Title } = Typography;

export const ListAntd = styled(List)`
  /* background-color: white; */
  align-self: center;
  align-items: flex-end;
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


export const LoginButton = styled.button`
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
  color: #4951EC !important;
`;

export const StyledBodySearch = styled.div`
  width: 800px;
  margin: 100px auto;
`;

export const StyledInputSearch = styled(Search)`
  margin-top: 30px;
  width: 500px;
  background-color: black;
`;

export const StyledCardSearch = styled(Card)`
  margin: 60px auto;
`;



/*=TIMELINE=================================*/

export const StyledCardTimeline = styled.div`
background-color: #FFF;
height: auto;
width: 490px;
position: relative;
left: 50px;
margin: 0px;
padding: 5px;
border-radius: 10px;
`
export const StyledTimelineCardUserContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
/* border: solid 2px blue; */
margin-bottom: 5px;
`


export const StyledTimelineCardAvatar = styled.div`
background-color: #3A3;
width: 30px;
height: 30px;
border-radius: 15px;
color: white;
display: flex;
align-items: center;
justify-content:center;

`

export const StyledTimelineCardUser = styled.div`
padding-left: 5px;
font-weight: bold;
color: rgba(11,7,84,0.85);
`

export const StyledTimelineCardTopText = styled.div`
display: flex;
justify-content:space-between;
/* border: solid 2px blue; */
`

export const StyledTimelineAuthor = styled.div`
width: 300px;
font-size: 1.5rem;
color: #2f2f2f;
text-align: left;
margin-left: 1rem;
/* border: solid 2px blue; */
`

export const StyledTimelineImg = styled.img`
margin: 13px;
width: 65%;
alt: "logo";
`

export const StyledTimelineCardTitle = styled.div`

/* display: flex;
justify-content: flex-start; */
/* border: 1px solid green; */
h2 { 
  font-family: Poppins;
  font-size: 2rem;
  color: #979797;
  text-align: center;
}
`

export const StyledTimelineCardSubtitle = styled.div`
font-family: Poppins;
font-size: 1.5rem;
color: #888;
/* border: solid 2px blue; */
`

export const StyledTimelineButton = styled.button`
color: #000;
padding: 0px 5px;
position: relative;
margin-top: 21px;
`

export const StyledForm = styled(Form)`
top: -50px;
`

/*BUSCA=================================*/

export const StyledBuscaCard = styled.div`
  background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.05), #FFF);
  height: 230px;
  width: 900px;
  display: flex;
  margin: 50px;
  padding-right: 20px;
  border-radius: 10px;
  border: solid 1px rgba(0,0,0,0.09);
`

export const StyledBuscaImg = styled.img`
  margin: 20px;
  max-height:190px;
  alt: "logo";
`

export const StyledBuscaCardTextContainer = styled.div`
`

export const StyledBuscaCardTopTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`


export const StyledBuscaCardTitle = styled.h2`
  font-family: Poppins;
  font-size: 2rem;
  color: #888;
  width: 400px;
  text-align: justify;
  position: relative;
  top: -20px;
  width: 45rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const StyledBuscaCardAuthor = styled.div`
  font-size: 1.2rem;
  width: 400px;
  text-align: justify;
  position: relative;
  top: -27px;
`

export const StyledBuscaCardButtonContainer = styled.div`
`


export const StyledBuscaCardButton = styled(Button)`
  border-radius: 21px;
  background-color: #4951EC;
  color: white;
  margin-right:30px;

`

export const StyledBuscaCardYear = styled.div`
`

export const StyledBuscaCardDescription = styled.div`
  font-size: 1.5rem;
  text-align: justify;
  width: 47em;
  overflow: hidden;
  text-overflow: ellipsis; 
  height: 95px;
`

export const StyledPopoverContainer = styled.div`
  /*background-color: #aaa;
  color: white;*/
`

export const StyledPopover = styled.p`
cursor: pointer;
`
