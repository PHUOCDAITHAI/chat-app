import React from 'react'
import { auth, db } from '../config/firebase';
import Messages from './Messages';
import {useCollectionData} from 'react-firebase-hooks/firestore';
const SendMessages = ({nameRoomMain, backgroundURL}) => { 
    const {uid} = auth.currentUser;
    const messageRef = db.collection('messages').orderBy('createdAt');
    const query = messageRef.where('nameRoom', '==', nameRoomMain);
    const [messages] = useCollectionData(query, {idField: 'id'});
    const deleteMsg = (id) => {
        db.collection('messages').doc(id).delete();
    }
    const backgroundRef = db.collection('backgrounds').orderBy('createdAt', 'desc').limit(1);
    const queryBg = backgroundRef.where('nameRoom', '==', nameRoomMain);
    const [backgrounds] = useCollectionData(queryBg, {idField: 'id'});
    return (
        <>  
            
            <div className="wrap-msg">
                <div className="sendmsg">
                    {
                        messages && messages.map((message, id) => (
                            <div key={id} className={message.uid === uid ? 'sent' : 'received'}>
                                <Messages 
                                    uid = {message.uid}
                                    deleteMsg={deleteMsg}
                                    id={message.id}
                                    text={message.text}
                                    img={message.img}
                                    video={message.video}
                                    photoURL={message.photoURL}
                                    displayName={message.displayName}
                                />
                            </div>
                        ))
                    }
                    
                </div>
                {backgrounds && backgrounds.map(({url}, id) => (
                    <div key={id}>
                        <div className="background-msg" >
                            <img src={url} alt="" />
                        </div>
                    </div>
                ))}
            </div>
           
            
       
        </>
    )
}

export default SendMessages
