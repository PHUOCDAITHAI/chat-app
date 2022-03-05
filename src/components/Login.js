import React from 'react'
import firebase,{ auth, db } from '../config/firebase';

const Login = () => {
    const signInWithGoogle = async () => {
        const {additionalUserInfo, user} = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        if(additionalUserInfo?.isNewUser){
            db.collection('users').add({
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                uid: user.uid
            })
        }
    } 
    return (
        <div>
            <div className="login-goole">
                <div onClick={signInWithGoogle} className="signingoogle">
                    <i className="fa fa-google"></i>
                    <button>ĐĂNG NHẬP BẰNG GOOGLE</button>
                </div>
            </div>
        </div>
    )
}

export default Login
