import React from 'react'
import Chat from './Chat'

const ChatRoom = ({setStatusMusic, isPlay}) => {
    return (
        <div className="chatroom">
            <Chat isPlay={isPlay} setStatusMusic={setStatusMusic} />
        </div>
    )
}

export default ChatRoom
