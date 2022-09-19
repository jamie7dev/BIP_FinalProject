import React, { useState } from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Month from "../components/main/Month"
import Day from "../components/main/Day"
import styled from "styled-components";

const MainPage = () => {
  const [settings, setSettings] = useState({autoPlay: false})
    return (
      <Wrap>
          <Carousel {...settings}>
            <div><Day /></div>
            <div>주 단위</div>
            <div><Month /></div>
          </Carousel>
      </Wrap>        
    )
}


export default MainPage;

const Wrap = styled.div`
  background-color: whitesmoke;
  padding: 10% 0;
`
