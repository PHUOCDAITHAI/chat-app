import React, {useState} from 'react'
import { auth} from '../config/firebase';
import AddRoom from './AddRoom';
import AddUser from './AddUser';
import Background from './Background';
import Room from './Room'

const NavChat = (props) => {
    const {displayName, photoURL} = auth.currentUser;
    const {nameRoomMain, setNameRoomMain, 
        descRoomMain, setDescRoomMain, setBackgroundURL, setStatusMusic, isPlay} = props;
    const [statusBackground, setStatusBackground] = useState(false);
    const [statusUser, setStatusUser] = useState(false);
    const handleBars = () => {
        const userInfo = document.getElementById('userInfo');
        const overplay = document.getElementById('overplay');
        if(userInfo.className === "userinfo") {
            userInfo.className += " userInfo-block";
        }else{
            userInfo.className = "userinfo";
        }

        if (overplay.className === "overplay"){
            overplay.className += " overplay-block";
        }else{
            overplay.className = "overplay";
        }
    }
    return ( 
        <>
            {nameRoomMain === '' ? (
                <div className="navchat">
                    <div onClick={handleBars} className="iconsbar">
                        <i className="fa fa-bars"></i>
                    </div>
                    <div id="overplay" className="overplay"></div>
                    <div className="roomdesc">
                        <div className="roomdesc-wrap">
                            <h1>HÃY CHỌN PHÒNG !</h1>
                        </div>
                    </div>
                    {nameRoomMain ? (
                        <div className="adduser">
                            <h5 onClick={() => setStatusBackground(true)}><i className="fa fa-picture-o"></i></h5>
                            <h5 onClick={() => setStatusUser(true)}><i className="fa fa-user-plus"></i></h5>
                        </div>
                    ) : ''}
                    
                </div>
            ) : (
                <div className="navchat">
                    <div onClick={handleBars} className="iconsbar">
                        <i className="fa fa-bars"></i>
                    </div>
                    <div id="overplay" className="overplay"></div>
                    <div className="roomdesc">
                        <div className="roomdesc-wrap">
                            <h3>{nameRoomMain}</h3>
                            <h5>{descRoomMain}</h5>
                        </div>
                    </div>
                    <div className="adduser">
                        <h5 onClick={() => setStatusBackground(true)}><i className="fa fa-picture-o"></i></h5>
                        <h5 onClick={() => setStatusUser(true)}><i className="fa fa-user-plus"></i></h5>
                    </div>
                </div>
            )}
            
            <div id="userInfo" className="userinfo">
                <div className="logout">
                    <img src={photoURL} alt="Logo" />
                    <button onClick={() => auth.signOut()}>ĐĂNG XUẤT</button>
                    <div onClick={handleBars} className="close-userinfo">
                        <i className="fa fa-times"></i>
                    </div>
                </div>
                <h5>{displayName}</h5>
                <Room 
                    nameRoomMain={nameRoomMain}
                    handleBars={handleBars}
                    setNameRoomMain={setNameRoomMain} 
                    setDescRoomMain={setDescRoomMain}
                />
                <AddRoom />
                <div onClick={() => setStatusMusic(true)} className="musicplayer">
                    <h1>Nhạc nền</h1>
                    <img className={`${isPlay ? 'music3D' : ''}`} src="./assets/img/cd3.png" alt="" />
                </div>
            </div>
            
            {statusBackground ? (
                <Background 
                    setStatusBackground={setStatusBackground}
                    nameRoomMain={nameRoomMain}
                    setBackgroundURL={setBackgroundURL}
                />
            ) : ''}
            {statusUser ? 
                <AddUser setStatusUser={setStatusUser} 
                    nameRoomMain={nameRoomMain}
                    descRoomMain={descRoomMain}
                /> 
                
            : ''}
            
            
        </>
        
    )
}

export default NavChat
