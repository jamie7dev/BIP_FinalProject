import moment from "moment"
import useDate from "../../hooks/useDate";
import useWeak from "../../hooks/useWeak"
import styled from "styled-components";
import { useState } from "react";

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Test = () => {
  const now = new Date();
  const onedayWeak = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const oneday = new Date(now.getFullYear(), now.getMonth(), 1).getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const CalendarDay = useDate(oneday, lastday, lastday);
  const CalendarWeak = useWeak(onedayWeak, lastday);

  // 선택한 날짜 확인
  const [chk, setChk] = useState(now.getDate());
  // 배열로 오브젝트 형식으로 요일, 날짜 저장 
  const result = [];

  for (let i = 0; i < lastday; i++) {
    result.push({ weak: CalendarWeak[i], day: CalendarDay[i] })
  }

  // 이전날로 선택 넘기기
  const onPrev = () => {
    let index = CalendarDay.findIndex((i) => i === chk)
    if (index > 0) {
      setChk(CalendarDay[index - 1]);
    }
  }
  // 다음날로 선택 넘기기
  const onNext = () => {
    let index = CalendarDay.findIndex((i) => i === chk)
    if (index < CalendarDay.length - 1) {
      setChk(CalendarDay[index + 1]);
    }
  }

  console.log(chk, oneday, onedayWeak, lastday);
  console.log(CalendarDay);
  console.log(CalendarWeak);
  return (
    <Wrap style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div style={{ display: "flex" }}>
          <p>{moment(now).format("YYYY년")}</p>
          <p>{moment(now).format("MM월")}</p>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconP onClick={() => { onPrev() }}>
              <ArrowBackIosNewRoundedIcon />
            </IconP>
          </div>
          <Datediv>
            <div style={{fontWeight:"bold"}}>월</div>
            <div style={{fontWeight:"bold"}}>화</div>
            <div style={{fontWeight:"bold"}}>수</div>
            <div style={{fontWeight:"bold"}}>목</div>
            <div style={{fontWeight:"bold"}}>금</div>
            <div style={{fontWeight:"bold"}}>토</div>
            <div style={{ color: "red", fontWeight:"bold" }}>일</div>
            {onedayWeak === 0 ?
              null
              : new Array(onedayWeak - 1).fill("").map((a) => {
                return (
                  <div>{a}</div>
                )
              })
            }
            {result.map((calendar, index) => {
              return (
                <div key={index}>
                  {chk === calendar.day ?
                    <DayDiv style={{ border: "1px solid black" }}
                      onClick={() => { setChk(calendar.day) }}>
                      {calendar.weak === "일" ?
                        <div style={{ color: "red" }}>{calendar.day}</div>
                        : <div>{calendar.day}</div>}
                    </DayDiv>
                    : <DayDiv
                      onClick={() => { setChk(calendar.day) }}>
                      {calendar.weak === "일" ?
                        <div style={{ color: "red" }}>{calendar.day}</div>
                        : <div>{calendar.day}</div>}
                    </DayDiv>}
                </div>
              )
            })}
          </Datediv>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconP onClick={() => { onNext() }}>
              <ArrowForwardIosRoundedIcon />
            </IconP>
          </div>
        </div>
      </div>
    </Wrap>
  )
}

export default Test;

const Wrap = styled.div`
  margin: 0 auto;
`

const DayDiv = styled.div`
margin:20px;
padding 10px;
border-radius: 20px;
cursor: pointer;
font-weight: bold;
&:hover{
  color:white;
  background-color:black;
}
`

const IconP = styled.p`
background-color:black;
color:white;
padding:5px;
border-radius:50%;
cursor:pointer;
`

const Datediv = styled.div`
display:grid;
grid-template-columns: repeat(7,1fr);
place-items: center;
`