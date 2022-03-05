import React, {useState} from 'react'
import { auth } from '../config/firebase';

const Messages = ({text, photoURL, displayName, deleteMsg, id, uid, img, video}) => {
    const [status, setStatus] = useState(false);
    return (
        <div className="messages">
            <div className="msg-img">
                <img src={photoURL} alt={displayName} />
            </div>
            <div onClick={() => setStatus(!status)} className="msg-text">
                
                {img === '' && video === '' ? <h4>{text}</h4> : (
                    <>
                        {img !== '' ? (
                            <img style={{borderRadius: '10px', marginBottom: '-5px'}} width="200" src={img} alt="" />
                        ) : (
                            <video style={{borderRadius: '10px', marginBottom: '-1px', overflow: 'hidden'}} src={video} height="120" width="200" controls></video>
                        )}
                    </>
                )}
                
                {status && uid === auth.currentUser.uid ? (
                    <div className="deletemsg">
                        <button onClick={() => deleteMsg(id)}>Thu hồi</button>
                    </div>
                ) : ''}
            </div>
        </div>
    )
}

export default Messages
