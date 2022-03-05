import React, {useState} from 'react'
import FormChat from './FormChat'
import NavChat from './NavChat'
import SendMessages from './SendMessages'

const Chat = ({setStatusMusic, isPlay}) => {
    const [nameRoomMain, setNameRoomMain] = useState('');
    const [descRoomMain, setDescRoomMain] = useState('');
    const [backgroundURL, setBackgroundURL] = useState('');
    return (
        <div className="chat">
            <NavChat 
                nameRoomMain={nameRoomMain} 
                setNameRoomMain={setNameRoomMain} 
                descRoomMain={descRoomMain}
                setDescRoomMain={setDescRoomMain}
                setBackgroundURL={setBackgroundURL}
                setStatusMusic={setStatusMusic}
                isPlay={isPlay}
            />
            <SendMessages 
                nameRoomMain={nameRoomMain} 
                backgroundURL={backgroundURL}
            />
            <FormChat nameRoomMain={nameRoomMain} />
        </div>
    )
}

export default Chat
