import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate, useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { useEffect, useState } from 'react';
import axios from 'axios';
import zIndex from '@mui/material/styles/zIndex';

const Option3 = ({ head }) => {
  const navigate = useNavigate();
  const [chk, setChk] = useState(0);
  const [leader, setLeader] = useState(false);
  const { id } = useParams();

  const bangjang = async () => {
    let a = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/events/master/check/${id}`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken')
      }
    }).then((response) => {
      console.log(response);
      if (response.data.success) {
        if (response.data.data.nickname === localStorage.getItem("name"))
          setLeader(true);
      } else {
        return;
      }
    })
  }

  const exitPromist = async () => {
    if (window.confirm("약속을 나가시겠습니까?")) {
      const data = await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/events/exit/${id}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((response) => {
        if (response.data.success) {
          navigate("/")
        } else {
          alert(response.data.data);
          setChk(0);
        }
      })
    } else {
      setChk(0);
    }
  }

  const removePromist = async () => {
    if (window.confirm("약속을 삭제하시겠습니까?")) {
      const data = await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/events/${id}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((response) => {
        if (response.data.success) {
          navigate("/")
        } else {
          alert(response.data.data);
          setChk(0);
        }
      })
    } else {
      setChk(0);
    }
  }

  useEffect(() => {
    bangjang();
  }, [])

  console.log(leader)

  return (
    <>
      <div onClick={() => { navigate("/") }}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
      <div style={{ marginLeft: "1%" }}>
        <p>{head}</p>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "2%", display:"flex" }}>
      {leader?
      <div onClick={() => { if(chk===0){setChk(2);} else{setChk(0)} }} style={{  marginRight: "20px" }}>
        <p><ManageAccountsRoundedIcon /></p>
      </div>
      :null}
      {chk===2 ?
        <div style={{
          width: "150px",
          position: "absolute",
          backgroundColor: "white",
          top: "50px", right: "60px",
          textAlign: "center",
          borderRadius: "5px",
          border: "1px solid black",
          zIndex:"10"
        }}>
          <div style={{ borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
            onClick={() => { console.log("아")}}>방장 위임</div>
          <div style={{ borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
            onClick={() => { console.log("아")}}>멤버 추방</div>
          <div style={{ borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
            onClick={() => { navigate(`/addpromise/edit${id}`) }}>약속 수정</div>
          <div style={{ borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
            onClick={() => { removePromist() }}>약속 삭제</div>
          <div style={{ padding: "3px", cursor: "pointer" }}
            onClick={() => { setChk(0); }}>취소</div>
        </div>
        : null}
      <div onClick={() => { if(chk===0){setChk(1);} else{setChk(0)} }} style={{  marginRight: "2%" }}>
        <p><MoreVertIcon /></p>
      </div>
      {chk == 1?
        <div style={{
          width: "150px",
          position: "absolute",
          backgroundColor: "white",
          top: "50px", right: "20px",
          textAlign: "center",
          borderRadius: "5px",
          border: "1px solid black",
          zIndex:"10"
        }}>
          <div style={{ borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
            onClick={() => { exitPromist() }}>약속 나가기</div>
          <div style={{ padding: "3px", cursor: "pointer" }}
            onClick={() => { setChk(!chk); }}>취소</div>
        </div>
        : null
      }
      </div>
    </>
  )
}

export default Option3;