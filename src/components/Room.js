import React, {useState} from 'react'
import { auth, db } from '../config/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const Room = (props) => {
    const {setNameRoomMain, setDescRoomMain, handleBars} = props;
    const {uid} = auth.currentUser;
    const [status, setStatus] = useState(true);
    const roomRef = db.collection('rooms').orderBy('createdAt');
    const query = roomRef.where('uid','==',uid);
    const [rooms] = useCollectionData(query, {idField: 'id'});
    const setRoom = (nameroom, descroom) => {
        handleBars();
        setNameRoomMain(nameroom);
        setDescRoomMain(descroom);
    }
    
    return (
        <div className="room">
            <div onClick={() => setStatus(!status)} className="header-room">
                <h4>
                {status ? <i className="fa fa-angle-down" /> : <i className="fa fa-angle-up" />} Danh sách các phòng
                </h4>
            </div>
            {status ? (
                <div className="name-room">
                    {
                        rooms && rooms.map((room, id) => (
                            <h5 key={id} onClick={() => setRoom(room.nameRoom, room.descRoom)}>
                                {room.nameRoom}
                            </h5>
                        ))
                    }
                </div>
            ) : ''}
        </div>
    )
}

export default Room
