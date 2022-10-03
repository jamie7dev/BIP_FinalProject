import { Route, Routes } from "react-router-dom"
import SignUpNickname from "../pages/signup/SignUpNickname"
import SignUp from "../pages/signup/SignUp"
import SignUpEmail from "../pages/signup/SignUpEmail"
import ProfilePage from "../pages/profile/ProfilePage"
import EditProfilePage from "../pages/profile/EditProfilePage"
import DetailProfilePage from "../pages/profile/DetailProfilePage"
import MainPage from "../pages/MainPage"
import IntroPage from "../pages/IntroPage"
import MemberPage from "../pages/MemberPage"
import AddPromisePage from "../pages/promise/AddPromisePage"
import DetailPromisePage from "../pages/promise/DetailPromisePage"
import SignUpChange from "../pages/signup/SignUpChange"
import KakaoPage from "../pages/signup/KakaoPage"
import NaverPage from "../pages/signup/NaverPage"
import PromiseLeaderPage from "../pages/promise/PromiseLeaderPage"
import AddCreditPage from "../pages/profile/AddCreditPage"
import ChatPage from "../pages/ChatPage"
import DonationPage from "../pages/donation/DonationPage"
import AddDonationPage from "../pages/donation/AddDonationPage"
import DetailDonationPage from "../pages/donation/DetailDonationPage"



const Router = () =>{
    return (
        <Routes>
            {/* 메인페이지 */}
            <Route path="/" exact element={<MainPage/>}/>
            {/* 시작페이지 */}
            <Route path="/intro" exact element={<IntroPage/>}/>
            {/* 회원가입 */}
            <Route path="/signup" exact element={<SignUp/>}/>
            <Route path="/signup/email" exact element={<SignUpEmail/>}/>
            <Route path="/signup/nickname" exact element={<SignUpNickname/>}/>
            <Route path="/signup/change" exact element={<SignUpChange/>}/>
            {/* 친구목록 */}
            <Route path="/member" exact element={<MemberPage/>}/>
            <Route path="/member/invite:id" exact element={<MemberPage/>}/>
            <Route path="/member/add:add" exact element={<MemberPage/>}/>
            {/* 마이페이지 */}
            <Route path="/profile" exact element={<ProfilePage/>}/>
            <Route path="/detailprofile" exact element={<DetailProfilePage/>}/>
            <Route path="/editprofile/:type" exact element={<EditProfilePage/>}/>
            <Route path="/addcredit" exact element={<AddCreditPage/>}/>
            {/* 약속잡기 */}
            <Route path="/addpromise" exact element={<AddPromisePage/>}/>
            <Route path="/addpromise/edit:id" exact element={<AddPromisePage/>}/>
            <Route path="/detailpromise/:id" exact element={<DetailPromisePage/>}/>
            <Route path="/promiseleader/id=:id/type=:type" exact element={<PromiseLeaderPage/>}/>
            {/* 재능기부 */}
            <Route path="/donation" exact element={<DonationPage/>}/>
            <Route path="/adddonation" exact element={<AddDonationPage/>}/>
            <Route path="/adddonation/edit:id" exact element={<AddDonationPage/>}/>
            <Route path="/detaildonation/:id" exact element={<DetailDonationPage/>}/>
            {/* 소셜로그인 */}
            <Route path="/login/kakao" exact element={<KakaoPage/>}/>
            <Route path="/login/naver" exact element={<NaverPage/>}/>
            {/* 채팅 */}
            <Route path="/chat/:id" exact element={<ChatPage/>}/>
            {/* 없는 페이지 */}
            <Route path="*" element={<div>404 Not Found</div>}/>
        </Routes>
    )
}

export default Router;