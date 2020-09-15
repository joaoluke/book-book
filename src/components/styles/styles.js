import styled from "styled-components";
import { Input, Typography, Card } from "antd";
import { List } from "antd";


const { Search } = Input;
const { Title } = Typography;

export const ListAntd = styled(List)`
  /* background-color: white; */
  align-self: center;
  align-items: flex-end;
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



export const StyledCardTimeline = styled.div`
background-color: #EEE;
height: 500px;
width: 400px;
position: relative;
left: 50px;
margin: 0px;
padding: 5px;
border: 5px solid black;
`
export const StyledTimelineCardUserContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
border: solid 2px blue;
margin-bottom: 5px;
`


export const StyledTimelineCardAvatar = styled.div`
background-color: #3A3;
width: 30px;
height: 30px;
border-radius: 15px;
color: white;
text-align: center;
`

export const StyledTimelineCardUser = styled.div`
padding-left: 5px;
`

export const StyledTimelineCardTopText = styled.div`
display: flex;
justify-content:space-between;
border: solid 2px blue;
`

export const StyledTimelineAuthor = styled.div`
width: 300px;
font-size: 1.5rem;
color: blue;
border: solid 2px blue;
`

export const StyledTimelineImg = styled.img`
margin-top: 10px;
width: 272;
alt: "logo";
`

export const StyledTimelineCardTitle = styled.div`
font-family: Poppins;
font-size: 2rem;
color: #888;
/* display: flex;
justify-content: flex-start; */
border: 1px solid green;
span { 
  margin-left: 100px;
}
`

export const StyledTimelineCardSubtitle = styled.div`
font-family: Poppins;
font-size: 1.5rem;
color: #888;
border: solid 2px blue;
`

export const StyledTimelineButton = styled.button`
color:blue;
padding: 0px 5px;
position: absolute;
top: 93%;
left: 32%
`

/* TODO:
CENTRALIZAR A INICIAL DO Avatar
ajustar/ alinhar os textos */