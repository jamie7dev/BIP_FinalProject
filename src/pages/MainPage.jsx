import React, { useState } from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Month from "../components/main/calendar/Month"
import Day from "../components/main/calendar/Day"
import styled from "styled-components";
import Weekdate from "../components/main/calendar/Weekdate";
import Footer from "../components/footer/Footer";
import Monthdate from "../components/main/calendar/Monthdate";
import { useNavigate } from "react-router-dom";
import PromiseList from "../components/main/list/PromiseList";
import dayjs from "dayjs";
import NextMonth from "../components/main/calendar/NextMonth";
import CreateIcon from '@mui/icons-material/Create';

const MainPage = () => {
  const [settings, setSettings] = useState({autoPlay: false, navButtonsAlwaysInvisible: true})
  const [day, setDay] = useState({unit:"day",date:dayjs().format('YYYY-MM-DD-00-00-00')})
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
    return (
        <>
      <Wrap>
          <Carousel 
          onChange={(now, previous) => setPage(now)}
          {...settings}>
            <div><Day setDay={setDay} page={page}/></div>
            <div><Weekdate setDay={setDay} page={page}/></div>
            <div><Monthdate setDay={setDay} page={page}/></div>
            <div><NextMonth setDay={setDay} page={page}/></div>
            {/* <div><Month /></div> */}
          </Carousel>
          <PromiseList day={day}/>
      </Wrap>
      <Plus>
          <IconBtn onClick={() => { navigate("/addpromise") }}><CreateIcon style={{color:"#6D09D1"}} /></IconBtn>
        </Plus>
      <Footer foot={0}/>
      <div style={{height:"50px"}}></div>
      </>
    )
}


export default MainPage;

const Wrap = styled.div`
  /* background-color: whitesmoke; */
  padding: 10% 0;
  font-family: "NotoSansKR-Regular";
  /* font-family: "YUniverse-B"; */
  /* font-family: "YiSunShin-M"; */
  /* font-family: "Hambak"; */
  /* font-family: "GowunDodum"; */
  /* font-family: "Mimiworld-B"; */
  /* font-family: "Mimiworld-R"; */
`
const Plus = styled.div`
position : fixed;
bottom : 0;
right: 5%;
margin-bottom:20%;
`

const IconBtn = styled.div`
display:flex;
justify-content:center;
align-items:center;
border: 1.5px solid #6D09D1;
border-radius:50%;
background-color: white;
width: 50px;
height: 50px;
color:white;
cursor:pointer;
//위치 고정시키기
position: fixed;
right: 10%;
bottom: 15%;
`