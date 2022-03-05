import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import React, {useState} from 'react';
import Login from './components/Login';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './config/firebase';
import ChatRoom from './components/ChatRoom';
import MusicPlayer from './components/MusicPlayer';
function App() {
  const [user] = useAuthState(auth);
  const [statusMusic, setStatusMusic] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  return (
    <div>
      <div className={`${statusMusic ? 'ApActive' : ''}`} >
        {user  ? 
        <ChatRoom 
          isPlay={isPlay}
          setStatusMusic={setStatusMusic}
        /> 
        : <Login 

        />}
      </div>
      

      <MusicPlayer 
      isPlay={isPlay}
      setIsPlay={setIsPlay}
      statusMusic={statusMusic} 
      setStatusMusic={setStatusMusic} />
      
    </div>
  );
}

export default App;
