import React, {useState} from 'react'
import firebase, { auth, db } from '../config/firebase';

const AddRoom = () => {
    const [status, setStatus] = useState(false);
    const [nameRoom, setNameRoom] = useState('');
    const [descRoom, setDescRoom] = useState('');
    const {uid} = auth.currentUser;
    const handleSubmit = async (e) => {
        e.preventDefault();
        await db.collection('rooms').add({
            nameRoom: nameRoom,
            descRoom: descRoom,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setNameRoom('');
        setDescRoom('');
        setStatus(false);
    }

    const handleStopClick = (e) => {
        e.stopPropagation();
    }

    return (
        <>
            <div onClick={() => setStatus(true)} className="addroom">
                <div className="icons-plus">
                    <i className="fa fa-plus"></i>
                </div>
                <button>Thêm phòng</button>
            </div>
            {status ? (
                <div onClick={() => setStatus(false)} className="addroom-form">
                    <div onClick={handleStopClick} className="addroom-animation">
                        <div onClick={() => setStatus(false)} className="close-addroom">
                            <i className="fa fa-times"></i>
                        </div>
                        <div className="header-login">
                            <h1>THÊM PHÒNG</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="form-control">
                            <label htmlFor="name-room">TÊN PHÒNG</label>
                            <input value={nameRoom} onChange={(e) => setNameRoom(e.target.value)} type="text" placeholder="Nhập tên phòng..." /> 
                            <label className="mt-25" htmlFor="password">MÔ TẢ</label> 
                            <input value={descRoom} onChange={(e) => setDescRoom(e.target.value)} type="text" placeholder="Nhập mô tả..." />
                            <button className="mt-25" type="submit">THÊM PHÒNG</button>
                        </form>
                    </div>
                </div>
            ) : ('')}
            
        </>
    )
}

export default AddRoom
