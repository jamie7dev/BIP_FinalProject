import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __addMemberName, __addMemberPhone} from "../../redux/modules/member";
import { clearSearch } from "../../redux/modules/searchMember";
import styled from "styled-components";

const AddMember = ({member,onChangeHandle, type, setChk}) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.searchMember);
  
  const addMemberName = (member) => {
    dispatch(__addMemberName(member))
    .then((response)=>{
      if(response.payload.success===false){
        alert(response.payload.data);
        return;
      }
    })
    dispatch(clearSearch());
   }
   const addMemberPhone = (member) => {
    dispatch(__addMemberPhone(member))
    .then((response)=>{
      if(response.payload.success===false){
        alert(response.payload.data);
        return;
      }
    })
    dispatch(clearSearch());
   }
  
  return (
    <>
    {user?.data?.success?
    <Card>
        {user?.data?.data?.profileImgUrl === null ?
          <img src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} style={{width:"50px", height:"50px",  borderRadius:"50%",margin:"15px", backgroundColor:"#C7FEC1"}}/>
          : <img src={user?.data?.data?.profileImgUrl} style={{width:"50px", height:"50px",  borderRadius:"50%",margin:"15px",  backgroundColor:"#C7FEC1"}} />
        }
        <p>{user?.data?.data?.nickname}</p>
        <p>({user?.data?.data?.nickname})</p>
        <AddFriend onClick={()=>{
          if(type==="name"){
            addMemberName(member);
            setChk(0);
          }else{
            addMemberPhone(member);
            setChk(0);
          }
        }}>추가</AddFriend>
    </Card>
    :null}
    </>
  )
}

export default AddMember;

const AddFriend = styled.p`
display: flex;

margin-left:auto;
width: 45px;
height: 22px;
margin-right:20px;
align-items: center;
justify-content: center;
background-color:#6D09D1;
font-weight: bold;
color:white;
padding: 10px;
border-radius:6px;
cursor:pointer;

`
const Card = styled.div`
display:flex;
height: 80px;
border:none;
border-radius: 8px;
background-color: #F5EAFB;
margin:10px

`

const Input = styled.input`
  margin-left: 20px;
  margin-bottom: 50px;
  border: none;
  outline: none;
  width: 70%;
  border-bottom: 1px solid  #F5EAFB;
  margin-bottom: 31px;
`

const Img = styled.img`
width:50px; 
height:50px;  
border-radius:50%;
margin:15px; 
background-color:#C7FEC1
`