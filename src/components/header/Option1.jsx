import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __editNickname, __editPhone, __editEmail, __editPicture } from '../../redux/modules/profile';
import Swal from 'sweetalert2';

// 프로필 변경 뒤로가기(프로필상세) 제목 완료
const Option1 = ({ head, payload, chk, image }) =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {type} = useParams();
  const regtest = /^[0-9]{6}$/;

  const editNickname = () => {
    if(chk){
      dispatch(__editNickname(payload))
      .then((response)=>{
        if(response.payload.data.success){
          Swal.fire("성공적으로 변경되었습니다.","　","success");
        }else{
          Swal.fire(response.payload.data,"　","error");
        }
      });
      navigate("/profile");
    }
  }
  const editPhone = () => {
    if(chk){
      if(regtest.test(payload.authCode)){
        dispatch(__editPhone({phoneNumber:payload.phonenumber,authCode:payload.authCode}))
        .then((response)=>{
          if(response.payload.success){
            Swal.fire("성공적으로 변경되었습니다.","　","success");
            navigate("/profile"); 
          }else{
            Swal.fire(response.payload.data,"　","error");
          }
      });
      }else{
        alert("인증번호를 확인해주세요.")
      }
    }
  }
  const editEmail = () => {
    if(chk){
      if(regtest.test(payload.authCode)){
      dispatch(__editEmail({email:payload.email,authCode:payload.authCode}))
      .then((response)=>{
        if(response.payload.success){
          Swal.fire("성공적으로 변경되었습니다.","　","success");
          navigate("/profile"); 
        }else{
          Swal.fire(response.payload.data,"　","error");
        }
      });
    }else{
      alert("인증번호를 확인해주세요.")
    }
    }
  }
  const editPicture = () => {
    console.log(image)    
    dispatch(__editPicture(image))
    .then((response)=>{
      if(response.payload.success){
        Swal.fire("성공적으로 변경되었습니다.","　","success");
        navigate("/profile"); 
      }else{
        Swal.fire(response.payload.data,"　","error");
      }
    });
  }

  return (
    <>
    <div onClick={()=>{navigate(-1)}}>
        <p><ArrowBackIosNewRoundedIcon style={{color:'#3E09D1', marginTop:"7px"}}/></p>
      </div>
    <div style={{marginLeft:"1%"}}>
        <p style={{fontWeight:"bold", fontSize:"20px"}}>{head}</p>
      </div>
      <div style={{marginLeft:"auto", marginRight:"2%", cursor:"pointer"}}
      onClick={()=>{
        if(type==="name"){
          editNickname();
        }else if(type==="call"){
          editPhone();
        }else if(type==="mail"){
          editEmail();
        }else {
          editPicture();
        }
      }}>
        <p style={{fontWeight:"bold", fontSize:"20px"}}>완료</p>
      </div>
    </>
  )
}

export default Option1;