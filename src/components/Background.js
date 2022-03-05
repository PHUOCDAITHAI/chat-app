import React, {useState} from 'react'
import BackgroundCard from './BackgroundCard';
import Carousel from 'react-elastic-carousel';
const Background = ({setStatusBackground, nameRoomMain, setBackgroundURL}) => {
    const [backGrounds ] = useState([
        {id: 1, url: 'https://mtrend.vn/wp-content/uploads/2019/06/Guide-Akali-C%C3%A1ch-ch%C6%A1i-b%E1%BA%A3ng-ng%E1%BB%8Dc-cho-Akali-Mid-m%E1%BA%A1nh-nh%E1%BA%A5t-806x440.png'},
        {id: 2, url: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_5.jpg'},
        {id: 3, url: 'https://i.imgur.com/NUJ8mJi.jpg'},
        {id: 4, url: 'https://cdn.oneesports.gg/cdn-data/wp-content/uploads/sites/4/2020/02/Lee-Sin-LMHT.jpg'},
        {id: 5, url: 'https://loltruyenky.vn/wp-content/uploads/2021/03/2018-10-02.jpg'},
        {id: 6, url: 'https://cdnmedia.webthethao.vn/uploads/2021-06-09/zed-hang-hieu.jpg'}
    ]);

    const breakPoints = [
        {width: 500, itemsToShow: 1},
        {width: 768, itemsToShow: 2},
        {width: 1200, itemsToShow: 3},
    ]

    const handleStopClick = (e) => {
        e.stopPropagation();
    }
    
    return (
        <div onClick={() => setStatusBackground(false)} className="background-main">
            <div onClick={handleStopClick} className="background">
                <i onClick={() => setStatusBackground(false)} className="fa fa-times" aria-hidden="true"></i>
                <Carousel breakPoints={breakPoints}>
                    {
                        backGrounds.map(({id, url}) => (
                            <BackgroundCard 
                                nameRoomMain={nameRoomMain} 
                                key={id} url={url} 
                                setBackgroundURL={setBackgroundURL}
                            />
                        ))
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default Background
