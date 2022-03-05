import React, {useEffect, useState} from 'react'
import firebase, { db } from '../config/firebase'

const AddUser = ({setStatusUser, nameRoomMain, descRoomMain}) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [uidSearch, setUidSearch] = useState('');
    const [idClass, setIdClass] = useState('');
    const handleStopClick = (e) => {
        e.stopPropagation();
    }
    useEffect(() => {
        db.collection('users').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()));
        })
    }, [])

    const filteredData = users.filter(user => {
        return user.displayName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await db.collection('rooms').add({
            nameRoom: nameRoomMain,
            descRoom: descRoomMain,
            uid: uidSearch,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setStatusUser(false);
    }

    const setuid = (uid, id) => {
        setUidSearch(uid);
        setIdClass(id);
    }

    return (
        <div>
            <div onClick={() => setStatusUser(false)} className="adduser-form">
                <div onClick={handleStopClick} className="adduser-animation">
                    <div onClick={() => setStatusUser(false)} className="close-addroom">
                        <i className="fa fa-times"></i>
                    </div>
                    <div className="header-login">
                        <h1>THÊM NGƯỜI DÙNG</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="form-control">
                        <label htmlFor="name-room">TÌM KIẾM</label>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Tìm..." /> 
                        <label className="listUser"> DANH SÁCH NGƯỜI DÙNG:</label>
                        <div className="userlist">
                            {search === '' ? '' : (
                                <>
                                {
                                    filteredData.map(({uid, displayName, photoURL}, id) => (
                                        <div key={id} onClick={() => setuid(uid, id)} className={`userlist-wrap ${idClass === id ? 'Active' : '' }`}>
                                            <img src={photoURL} alt="" />
                                            <h5>{displayName}</h5>
                                        </div>
                                    ))
                                }
                                </>
                            )}
                        </div>
                        <button className="mt-25" type="submit">THÊM NGƯỜI DÙNG</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser
