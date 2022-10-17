import { useEffect, useState } from "react";
import KaKaoMap from "../map/KakaoMap";
import DaumPostcode from 'react-daum-postcode';
import axios from "axios";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components"
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AddDonation = ({ donate, setDonate, onChangeHandler, imgList, setImgList }) => {
  const { kakao } = window;
  const { id } = useParams();
  // const initailState = []
  // const [imgList, setImgList] = useState(initailState);
  // 게시판 종류
  const [post, setPost] = useState("재능요청");
  const [chkPost, setChkPost] = useState(false);
  // 카테고리 종류
  const [category, setCategory] = useState("봉사");
  const [chkCategory, setChkCategory] = useState(false);
  // 주소 검색 후 나온 결과 주소값 지정
  const [roadAddress, setRoadAddress] = useState(null);
  // 위도 경도 변경되는 값을 받을 수 있도록 상태 관리.
  const [lat, setLat] = useState(37.5656);
  const [lng, setLng] = useState(126.9769);
  // 주소검색 출력 여부 확인값
  const [openAddr, setOpenAddr] = useState(false);

  const __isToken = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }
    ).then((res) => {
      if (res.data.success) {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("RefreshToken", res.headers.refreshtoken);
      }
    })
  }

  useEffect(() => {
    if (id !== undefined && donate.address !== "") {
      kakaoGeocode(donate.address)
    }
  }, [donate.address])

  useEffect(() => {
    switch (donate.category) {
      case "volunteer": setCategory("봉사"); break;
      case "care": setCategory("돌봄"); break;
      case "edu": setCategory("교육"); break;
      case "share": setCategory("나눔"); break;
      case "cultureart": setCategory("문화/예술"); break;
      case "people": setCategory("모임/구인"); break;
      default: setCategory("기타"); break;
    }
  }, [donate.category])

  useEffect(() => {
    switch (donate.board) {
      case "request": setPost("재능요청"); break;
      default: setPost("재능기부"); break;
    }
  }, [donate.board])

  // 주소 값을 통해 좌표를 찾는 함수
  const kakaoGeocode = (address) => {
    // 카카오 geocode 사용 (index.html에 자바스크립트 선언)
    new kakao.maps.services.Geocoder().addressSearch(
      address,
      (result, status) => {
        if (status !== kakao.maps.services.Status.OK)
          return Swal.fire("에러가 발생했습니다!", '　', 'error');

        // // 경도, 위도 값
        let x = parseFloat(result[0].x);
        let y = parseFloat(result[0].y);

        setLat(y);
        setLng(x);
        // // 주소값 지정
        setRoadAddress(result[0].road_address.address_name);
        // // 좌표값을 약속 생성 변수 값으로 입력
        setDonate({ ...donate, address: result[0].road_address.address_name, coordinate: (String(y) + "," + String(x)) })
      }
    )
  }

  const onChange = async (e) => {
    // input file에서 선택된 file을 img로 지정
    const image = e.target.files[0];
    // 이미지 파일이 아니면 이후 동작을 생략하고 경고문구 출력
    // if (!img?.name.match(fileForm)) {
    //   alert("이미지파일(.jpg, .png, .bmp)만 올려주세요.");
    //   return;
    // }
    setImgList([...imgList, { id: donate.imgUrlList.length }]);

    // 폼데이터 형식 선언
    const formData = new FormData();

    //폼데이터 값 (key : file, value : img)  
    // api에서 요구하는 key값과 value값 지정 (key : "image", value: 이미지파일)
    formData.append("file", image); // 반복문을 활용하여 파일들을 formData 객체에 추가한다
    // 이미지만 보내면되기때문에 더이상 append하지않고 이미지파일 전송

    __isToken().then(async () => {
      // form데이터를 보내주면 이미지가 저장되는 url경로를 불러주는 api
      await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/image", formData, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          RefreshToken: localStorage.getItem("RefreshToken"),
          "Content-Type": "multipart/form-data",
        },
      }).then(
        // url호출 성공시 img값에 url값 저장
        (res) => {
          setDonate({ ...donate, imgUrlList: [...donate.imgUrlList, res.data.data] })
        }
      )

      // 폼데이터 들어가는 형식을 보기위한 내용
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
    })
  }
  console.log(imgList)
  console.log(donate.imgUrlList)
  return (
    <div style={{ width: "70%", margin: "0 auto", minWidth: "500px",maxWidth: "800px"}}>
      {openAddr ?
        <div style={{ position: "relative", justifyContent: "center", width:"%", margin:"0 auto" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ backgroundColor: "#D9DCFB", cursor:"pointer", fontWeight:"bold", borderRadius:"6px", padding:"3px" }}
              onClick={() => { setOpenAddr(false) }}>닫기</div>
          </div>
          <div>
            <DaumPostcode
              autoClose={false}
              onComplete={(data) => { kakaoGeocode(data.address); setOpenAddr(false) }} />
          </div>
        </div>
        : null}
        <UnderLine>
        {!chkPost ?
          <p style={{ marginBottom: "20px" ,marginRight: "20px"}} onClick={() => { setChkPost(!chkPost) }}>{post}<KeyboardArrowDownOutlinedIcon style={{ verticalAlign: "sub" }} /></p>
          : <p style={{ marginBottom: "20px" ,marginRight: "20px"}} onClick={() => { setChkPost(!chkPost) }}>{post}<KeyboardArrowUpOutlinedIcon style={{ verticalAlign: "sub" }} /></p>
        }
        {chkPost ?
       
          <Category>
            <div onClick={() => { setChkPost(!chkPost); setDonate({ ...donate, board: "request" }) }}>재능요청</div>
            <div onClick={() => { setChkPost(!chkPost); setDonate({ ...donate, board: "donation" }) }}>재능기부</div>
          </Category>
          : null}
 
    
        {!chkCategory ?
          <p style={{ marginBottom: "20px" }} onClick={() => { setChkCategory(!chkCategory) }}>{category}<KeyboardArrowDownOutlinedIcon style={{ verticalAlign: "sub" }} /></p>
          : <p style={{ marginBottom: "20px" }} onClick={() => { setChkCategory(!chkCategory) }}>{category}<KeyboardArrowUpOutlinedIcon style={{ verticalAlign: "sub" }} /></p>
        }
        {chkCategory ?
          <CategoryKind style={{ display: "flex", flexDirection: "column", borderRadius: "8px", boxShadow: "3px 3px 3px 3px #EFEEF0", width: "90px", padding: "10px", marginBottom: "10px" }}>
            <span onClick={() => { setChkCategory(!chkCategory); setDonate({ ...donate, category: "volunteer" }) }}>봉사</span>
            <span onClick={() => { setChkCategory(!chkCategory); setDonate({ ...donate, category: "care" }) }}>돌봄</span>
            <span onClick={() => { setChkCategory(!chkCategory); setDonate({ ...donate, category: "edu" }) }}>교육</span>
            <span onClick={() => { setChkCategory(!chkCategory); setDonate({ ...donate, category: "share" }) }}>나눔</span>
            <span onClick={() => { setChkCategory(!chkCategory); setDonate({ ...donate, category: "cultureart" }) }}>문화/예술</span>
            <span onClick={() => { setChkCategory(!chkCategory); setDonate({ ...donate, category: "people" }) }}>모임/구인</span>
            <span onClick={() => { setChkCategory(!chkCategory); setDonate({ ...donate, category: "etc" }) }}>기타</span>
          </CategoryKind >
          : null}
      </UnderLine>
      <UnderLine>
        <span style={{ marginBottom: "20px" }}>포인트</span>
        <input style={{ border: "none", outline: "none", marginLeft:"10px",marginBottom: "20px" }} placeholder="추가 제공할 포인트를 적어주세요" name="point" value={donate.point === 0 ? "" : donate.point} onChange={(e) => { onChangeHandler(e) }} />
      </UnderLine>
      <UnderLine >
        <span style={{ marginRight: "10px",marginBottom: "20px" }}>내용</span>
        <input style={{ border: "none", outline: "none",marginBottom: "20px"}} placeholder="재능 기부를 할 내용 혹은 기부 요청할 내용을 적으세요." name="content" value={donate.content} onChange={(e) => { onChangeHandler(e) }} />
      </UnderLine>
      <UnderLine>
        <span style={{ marginBottom:"20px"}}>사진</span>
        <input style={{ marginLeft: "10px",marginBottom: "20px" }} type="file" id="input_file" onChange={onChange} accept="image/jpg,/impge/png,image/jpeg" />
      </UnderLine>
      {imgList.map((img) => {
          return (
            <ImgArea key={img.id}>
              <div style={{ display:"flex", alignItems:"start"}}>
              <img src={donate.imgUrlList[img.id]}  style={{ width:"90px", height:"90px", objectFit: "cover"}}/>
              <Btn onClick={() => {
                let count = img.id;
                let copy = [...imgList];
                copy.splice(img.id, 1);
                let copyList = copy.map((x) => {
                  if (x.id < count) {
                    return { id: x.id }
                  } else {
                    return { id: x.id - 1 }
                  }
                })
                setImgList([...copyList]);
                let urlList = [...donate.imgUrlList];
                urlList.splice(img.id, 1);
                setDonate({ ...donate, imgUrlList: [...urlList] });
              }}><CloseIcon style={{fontSize:"12px"}}/></Btn>
            </div>
          </ImgArea>
            
          )
        })}
      <When>
      <div>장소</div>
      {openAddr ? null :
        roadAddress === null ?
          <div style={{ color: "#D9D9D9" }}
            onClick={() => { setOpenAddr(!openAddr) }}>주소검색</div>
          : <div onClick={() => { setOpenAddr(!openAddr) }}>{roadAddress}</div>
      }
      </When>
      <KaKaoMap lat={lat} lng={lng} width={"380px"} height={"300px"} />
    </div>
  )
}
export default AddDonation;

const Category = styled.div`
  display: flex;
  position : absolute;
  align-items: center;
  flex-direction: column;
  width: 90px;
  padding: 10px;
  border-radius: 8px; 
  box-shadow:3px 3px 3px 3px #EFEEF0;
  top: 40px;
  cursor: pointer;
  z-index: 10;
  background-color: #fff;
  div{
 
  &:hover{
    
    cursor: pointer;
    background-color: #3E09D1;
    color:#fff;
  }
 }
`
const CategoryKind = styled.div`
  display: flex;
  position : absolute;
  align-items: center;
  flex-direction: column;
  width: 90px;
  margin-bottom:10px;
  padding: 10px;
  border-radius: 8px; 
  box-shadow:3px 3px 3px 3px #EFEEF0;
  top: 40px;
  left: 100px;
  background-color: #fff;
  z-index: 10;
  span{
 
  &:hover{
    
    cursor: pointer;
    background-color: #3E09D1;
    color:#fff;
  }
}
`

const ImgArea = styled.div`
display: inline-block;
position : relative;
width:90px; 
margin-top:10px; 
margin-right: 10px;
`

const Btn = styled.button`
width: 18px; 
height: 18px; 
border-radius: 50%;
border: none;  
background-color:#ffffff6f;
position: absolute; 
margin: 2px 70px;
padding: 0;
`

const UnderLine = styled.div`
  
  display: flex;
 position: relative;
  align-items: center;
  border-bottom: 0.8px solid #D9DCFB;
  margin: 5% 5% 5% 12%;
  width: 70%;
`


const When = styled.div`
  /* background-color: skyblue; */
  width: 70%;
  display: flex;
  margin: 5% 5% 5% 12%;
  justify-content: space-around;
  align-items: center;
`;