import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CheckEmail = () => {
  const [visble, setVisble] = useState(false);
  const [chkBtn,setChkBtn] = useState("인증하기 받기")
	const navigate = useNavigate();
	
  const initialState = {
    value:''
  }
  const [member, setMember] = useState(initialState);
  const [chkmail,setChkmail] = useState("사용 가능한 이메일 입니다.")
  const [test,setTest] = useState("");
  /** 이메일 주소 유효검사*/ 
  const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const regtest = /^[0-9]{6}$/;

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setMember({...member, [name]: value})
  }

  const __chkEmail = async(payload)=>{
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST+"/api/member/chkemail", payload);
  }

  const __examEmail = async(payload)=>{
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST+"/api/member/auth/email", payload)
    .then((response)=>{
      console.log(response)
      setChkmail(response.data.data)
      setVisble(!visble);
    });
  }

  useEffect(()=>{
    if(regexEmail.test(member.value)){
      __chkEmail(member);
    }
  },[member])

  const __emailLogin = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/login/email", payload)
    .then((response)=>{
      if(response.data.success===true){
        localStorage.setItem("Authorization", response.headers.authorization);
        localStorage.setItem("RefreshToken", response.headers.refreshtoken);
        // localStorage.setItem("name", response.data.data);
        navigate("/")
      }else{
       alert(response.data.data) 
      }
    });
  }
  return (
    <div>
      <Wrapper>
        <IconArea>
          <Button onClick={()=>{navigate(-1)}} >
            <KeyboardArrowLeftIcon />
          </Button>
        </IconArea>

        <InfoArea>
          <p>
            이메일로 계정찾기
          </p>
        </InfoArea>
          <form action="">
          <TextField
            id="outlined-basic"
            name="value"
            value={member.value}
            onChange={onChangeHandler}
            label="이메일"
            variant="outlined"
            placeholder="이메일을 입력해주세요"
						
          />
           {member.value===""?null: regexEmail.test(member.value)?null:(<div style={{color:"red", fonSizen:"14px"}}>올바른 이메일 형식이 아닙니다.</div>)}

           {visble && <TextField variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" value={test} onChange={(e)=>{setTest(e.target.value)}} minLength={6} maxLength={6}/>}
          {test === "" ? null :
            regtest.test(test) ? null : (<><div style={{ color: "red", fonSizen: "14px" }}>6자리 인증번호를 입력해주세요.</div></>)}
					
          </form>
          
          
         

        <BtnArea>
				{visble&&<Button variant="contained" className="default_btn">인증번호 다시 받기</Button>}
          <Button
            variant="contained" 
            onClick={() => {
              if (regexEmail.test(member.value)) {
                // if (regexEmail.test(member.value)) {
                if (!visble) {
                  setChkBtn("인증번호 확인하기");
                  __examEmail(member);
                } else {
                  if(regtest.test(test)){
                    __chkEmail(member);
                  }else{
                    alert("인증번호를 확인해주세요.")
                  }
                }
              } else {
                alert("이메일을 확인해주세요.")
              }
            }}>
            {chkBtn}
          </Button>
        </BtnArea>
      </Wrapper>
    </div>
  );
};

export default CheckEmail;



const IconArea = styled.div`
  width: 1%;
  Button {
    width: 20%;
    span {
      padding: 0;

      svg {
        margin-right: 40px;
      }
    }
  }
`;

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
 }

`;



const BtnArea = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 5px;
  .default_btn{
    background-color: #ececec;
    color: black;
  }
  Button {
    width: 100%;
		color: black;
		background-color: #ececec;
    margin-bottom: 10px;
		height: 50px;
		font-weight: 600;
		align-items: center;
    &:hover{
      background-color: #00766c;
      color:white;
    }
  }
`;
