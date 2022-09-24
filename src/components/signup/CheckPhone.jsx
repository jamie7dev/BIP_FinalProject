import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import axios from "axios";

const CheckPhone = () => {
  const [visble, setVisble] = useState(false);
  const [chkBtn, setChkBtn] = useState("인증하기 받기")
  const navigate = useNavigate();

  const initialState = {
    value: ''
  }
  const [member, setMember] = useState(initialState);
  const [test,setTest] = useState("")
  /** 휴대폰 번호 인증 유효검사*/
  const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
  const regtest = /^[0-9]{6}$/;

  const time = useRef(180);
  const [min, setMin] = useState(parseInt(3));
  const [sec, setSec] = useState(0);
  const timer = useRef(null);


  useEffect(()=>{
    return () => clearInterval(timer.current);
  },[])

  useEffect(()=>{
    if(time.current<0){
      clearInterval(timer.current);
    }
  },[sec])

  const countDown = () => {
    setMin(parseInt(time.current/60));
    setSec(time.current%60);
    time.current-=1;
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value })
  }


  const __chkPhone = async (payload) => {
    if (regexPhone.test(member.value)) {
      let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chkphonenumber", payload)
        .then((response) => {
          if(response.data.data){
            __signup({authCode:test, phoneNumber:payload.value})
          }else{
            __login({authCode:test, phoneNumber:payload.value})
          }
        });
    }
  }
  const __testPhone = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/test", payload)
    .then((response)=>{
      console.log(response)
    });
  }
  const __examPhone = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/sms", payload)
    .then((response)=>{
    });
  }
  const __signup = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/signup", payload)
    .then((response)=>{
      if(response.data.success===true){
        localStorage.setItem("Authorization", response.headers.authorization);
        localStorage.setItem("RefreshToken", response.headers.refreshtoken);
        navigate("/signup/nickname")
      }else{
       alert(response.data.data) 
      }
    });
  }
  const __login = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/login", payload)
    .then((response)=>{
      if(response.data.success===true){
        localStorage.setItem("Authorization", response.headers.authorization);
        localStorage.setItem("RefreshToken", response.headers.refreshtoken);
        localStorage.setItem("name", response.data.data.nickname);
        navigate("/")
      }else{
       alert(response.data.data) 
      }
    });
  }
  return (
    <div>
      <Wrapper>
      <Header option={0} />

        <InfoArea>
          <p>
            휴대폰 인증으로 가입해요 번호는 안전하게 보안되어 어디에도 공개되지
            않아요
          </p>
        </InfoArea>
        <form action="">
          <input
            id="outlined-basic"
            label="휴대폰 번호"
            variant="outlined"
            name="value"
            value={member.value}
            onChange={onChangeHandler}
            minLength={10}
            maxLength={11}
            placeholder="휴대폰 번호를 입력해주세요"

          />
          {member.value === "" ? null :
            regexPhone.test(member.value) ? null : (<><div style={{ color: "red", fonSizen: "14px" }}>올바른 휴대폰 번호이 아닙니다.</div></>)}

          {visble && <input variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" value={test} onChange={(e)=>{setTest(e.target.value)}} minLength={6} maxLength={6}/>}
          {test === "" ? null :
            regtest.test(test) ? null : (<><div style={{ color: "red", fonSizen: "14px" }}>6자리 인증번호를 입력해주세요.</div></>)}
        </form>



        <BtnArea>
          {visble && <Button variant="contained" className="default_btn" onClick={()=>{__testPhone(member);}}>인증번호 다시 받기({min}:{sec<10?<>0{sec}</>:<>{sec}</>})</Button>}
          {!regexPhone.test(member.value)?
          <Button
            variant="contained"
            onClick={() => {
              if (regexPhone.test(member.value)) {
                if (!visble) {
                  setVisble(!visble);
                  setChkBtn("인증번호 확인하기");
                  __testPhone(member);
                  timer.current = setInterval(()=>{
                    countDown();
                  },1000);
                } else {
                  if(regtest.test(test)){
                  __chkPhone(member);
                  }else{
                    alert("인증번호를 확인해주세요.")
                  }
                }
              } else {
                alert("휴대폰 번호를 확인해주세요.")
              }
            }}>
            {chkBtn}
          </Button>
          :<Button
          style={{backgroundColor: "#6D09D1"}}
          variant="contained"
          onClick={() => {
            if (regexPhone.test(member.value)) {
              if (!visble) {
                setVisble(!visble);
                setChkBtn("인증번호 확인하기");
                __testPhone(member);
                timer.current = setInterval(()=>{
                  countDown();
                },1000);
              } else {
                if(regtest.test(test)){
                __chkPhone(member);
                }else{
                  alert("인증번호를 확인해주세요.")
                }
              }
            } else {
              alert("휴대폰 번호를 확인해주세요.")
            }
          }}>
          {chkBtn}
        </Button>
        }
        </BtnArea>
        <EmailDiv onClick={()=>{navigate("/signup/email")}}>
          <p>휴대폰 번호가 변경되었나요? </p>
          <EmailP> 이메일로 계정찾기</EmailP>
        </EmailDiv>
      </Wrapper>
    </div>
  );
};

export default CheckPhone;




const InfoArea = styled.div`
  display: flex;
  padding: 10px;
	align-items: center;
	justify-content: center;
  p {
    font-weight: 600;
    font-size: 20px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  margin: 20px auto;

	div{
		margin-bottom: 10px;
	
	}

 form{
  display: flex;
  flex-direction: column;
  input{
    border:2px solid #D5C2F8;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 13px;
    &:focus{
      border-color:#6D09D1;
      outline: none;
    }
 }

`;



const BtnArea = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 5px;
  .default_btn{
    background-color: #D5C2F8;
    color:  white;
  }
  Button {
    width: 100%;
    color: white;
    background-color: #D5C2F8;
    margin-bottom: 10px;
		height: 50px;
		font-weight: 600;
		align-items: center;
    &:hover{
      background-color: #6D09D1;
      color:white;
    }
  }
`;

const EmailP = styled.p`
text-decoration : underline;
`
const EmailDiv = styled.div`
display:flex;
justify-content:center;
&:hover{
  font-weight:bold;
  cursor:pointer;
}
`