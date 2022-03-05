import React, {useState, useRef} from 'react'
import firebase,{ auth, db } from '../config/firebase';
import Spinner from './Spinner';
import Upload from './Upload';

const FormChat = ({nameRoomMain}) => {
    const [status, setStatus] = useState(false);
    const [messages, setMessages] = useState('');
    const {uid, displayName, photoURL} = auth.currentUser;
    const scrollRef = useRef();
    const [img, setImg] = useState('');
    const [video, setVideo] = useState('');
    const [progress, setProgress] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await db.collection('messages').add({
            text: messages,
            img: img,
            video: video,
            uid,
            displayName,
            photoURL,
            nameRoom: nameRoomMain,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setImg('');
        setVideo('');
        setProgress(0);
        setMessages('');
        scrollRef.current.scrollIntoView({behavior: 'smooth'});
    }
    return (
        <>
        {nameRoomMain === '' ? '' : (
            <>
            <div ref={scrollRef}></div>
            <div className="formchat">
                <form className="formchat-control" onSubmit={handleSubmit}>
                    <input value={messages} onChange={(e) => setMessages(e.target.value)} type="text" placeholder="Nhập tin nhắn...." />
                    <div onClick={() => setStatus(true)} className="upload">
                        <i className="fa fa-upload" aria-hidden="true"></i>
                        {progress === 0 ? '' : (
                            <div className="progress-file">
                                {progress > 0 && progress < 100 ? (
                                    <>
                                        <Spinner />
                                    </>
                                ) : (
                                    <>
                                    {img !== '' ? (
                                            <img style={{borderRadius: '10px', marginBottom: '-5px'}} width="200" src={img} alt="" />
                                        ) : (
                                            <video style={{borderRadius: '10px', overflow: 'hidden'}} src={video} height="120" width="200" controls></video>
                                    )}
                                    </>
                                )}
                            </div>
                        )}                        
                    </div>
                    <button type="submit">Gửi</button>
                </form>
            </div>
            </>
        )}

        {status ? <Upload 
            setStatus={setStatus} 
            img={img}
            setImg={setImg} 
            video={video}
            setVideo={setVideo}
            setProgress={setProgress}
        /> : ''}
        
        
        </>
    )
}

export default FormChat
