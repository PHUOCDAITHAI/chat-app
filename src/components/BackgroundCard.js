import React from 'react'
import firebase,{ db } from '../config/firebase'

const BackgroundCard = ({url, nameRoomMain, setBackgroundURL}) => {
    const handleBackgroundChange = async () => {
        setBackgroundURL(url);
        await db.collection('backgrounds').add({
            nameRoom: nameRoomMain,
            url: url,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
    return (
        <div className="card">
            <div className="card-img">
                <img onClick={handleBackgroundChange} src={url} alt="" />
            </div>
        </div>
    )
}

export default BackgroundCard
