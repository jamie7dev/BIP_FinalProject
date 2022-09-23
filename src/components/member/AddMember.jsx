import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __addMemberPhone} from "../../redux/modules/member";

const AddMemberPhone = () => {
  
  const initialState = {
   value:""
  }


  const [member, setMember] = useState(initialState)
  const dispatch = useDispatch()
  
  const onChangeHandle = (e) => {
   const {name, value} = e.target;
   setMember({...member, [name]: value})
 }

 const onSumbit = (e) => {
  e.preventDefault()
  dispatch(__addMemberPhone(member));
 }
  
  return (
    <form onSubmit={onSumbit}>
      <p>휴대폰 번호</p>
        <input type="text" onChange={onChangeHandle} name="value" value={member.value}/>
        <button>검색</button>
    </form>
  )
}

export default AddMemberPhone;