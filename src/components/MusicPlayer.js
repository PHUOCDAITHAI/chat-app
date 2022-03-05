import React, {useState, useRef, useEffect} from 'react'

const MusicPlayer = ({statusMusic, setStatusMusic, isPlay, setIsPlay}) => {
    const [songs] = useState([
        {
            name: 'They said',
            singer: 'BinZ',
            path: './assets/music/Theysaid.mp3',
            image: './assets/img/theysaid.jpg'
        },
        {
            name: 'Hãy trao cho anh',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/htca.mp3',
            image: './assets/img/htca.jpg'
        },
        {
            name: 'Phía sau em',
            singer: 'Kay Trần',
            path: './assets/music/pse.mp3',
            image: './assets/img/phiasauem.jpg'
        },
        {
            name: 'Thôi anh không chơi đâu',
            singer: 'BinZ',
            path: './assets/music/thoianhkhongchoi.mp3',
            image: './assets/img/thoianhkhongchoi.jpg'
        },
        {
            name: 'They said',
            singer: 'BinZ',
            path: './assets/music/Theysaid.mp3',
            image: './assets/img/theysaid.jpg'
        },
        {
            name: 'Hãy trao cho anh',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/htca.mp3',
            image: './assets/img/htca.jpg'
        },
        {
            name: 'Phía sau em',
            singer: 'Kay Trần',
            path: './assets/music/pse.mp3',
            image: './assets/img/phiasauem.jpg'
        },
        {
            name: 'Thôi anh không chơi đâu',
            singer: 'BinZ',
            path: './assets/music/thoianhkhongchoi.mp3',
            image: './assets/img/thoianhkhongchoi.jpg'
        },
    ])
    const audioRef = useRef();
    const scrollAudio = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        if(isPlay){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
        if(currentIndex >=0 && currentIndex <= 1){
            scrollAudio.current.scrollIntoView({behavior: 'smooth', block: 'end'});
        }else{
            scrollAudio.current.scrollIntoView({behavior: 'smooth', block: 'nearest'});
        }
    })

    const prevSong = () => {
        setIsPlay(true);
        setCurrentIndex(currentIndex - 1);
        if(currentIndex <= 0){
            setCurrentIndex(songs.length - 1);
        }
    }

    const nextSong = () => {
        setIsPlay(true);
        setCurrentIndex(currentIndex + 1);
        if(currentIndex >= songs.length - 1){
            setCurrentIndex(0);
        }
    }

    const onTimeUpdate = () => {
        if(audioRef.current.duration){
            const progressPercent = Math.floor(
                audioRef.current.currentTime / audioRef.current.duration * 100
            )
            setCurrentTime(progressPercent);
        }
        
    }

    const handleInput = (e) => {
        const seekTime = Math.floor(audioRef.current.duration / 100 * e.target.value);
        if(seekTime){
            audioRef.current.currentTime = seekTime;
        }
    }

    const onEnded = () => {
        nextSong();
    }

    const clickSong = (index) => {
        setCurrentIndex(index);
        setIsPlay(true);
    }
    return (
        <div className={`player ${statusMusic ? '' : 'Active'}`}>
            <div className="dashboard">
                <p onClick={() => setStatusMusic(false)} className="icon-close"><i className="fa fa-times"></i></p>
                <div className="container">
                    <p onClick={() => setStatusMusic(false)} className="close-mobile"><i className="fa fa-times"></i></p>
                    <header>
                        <h4>Now playing: </h4>
                        <h2>{songs[currentIndex].name}</h2>
                    </header>
                    <div className="cd cd-mobile">
                        <div className="cd-thumb" 
                        style={{backgroundImage: `url(${songs[currentIndex].image})`}}>
                        </div>
                    </div>
                    <div className="controls">
                        <div onClick={prevSong} className="prev">
                            <i  className="fa fa-step-backward"></i>
                        </div>
                        <div onClick={() => setIsPlay(!isPlay)} className="play">
                            {isPlay ? <i className="icon-pause fa fa-pause" />
                            : <i className="icon-play fa fa-play" />}
                        </div>
                        <div onClick={nextSong} className="next">
                            <i  className="fa fa-step-forward"></i>
                        </div>
                    </div>
                    <input 
                        className="progress" 
                        type="range" step="1" min="0" max="99" 
                        value={currentTime}
                        onChange={handleInput}
                    />
                    <audio 
                        ref={audioRef} 
                        src={songs[currentIndex].path}
                        onTimeUpdate={onTimeUpdate}
                        onEnded={onEnded}
                    ></audio>
                </div>
            </div>
            <div className="playlist">
                {songs.map((song,index) => (
                    <div ref={index === currentIndex ? scrollAudio : null} className={`card ${currentIndex === index ? 'active' : ''}`} onClick={() => clickSong(index)} key={index}>
                        <div className="playlist-card">
                            <div className="card-img"
                            style={{backgroundImage: `url(${song.image})`}}>
                            </div>
                        </div>
                        <div className="header-card">
                            <h3>{song.name}</h3>
                            <h5>{song.singer}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MusicPlayer
