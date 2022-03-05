import React, {useState} from 'react'
import firebase ,{ storage } from '../config/firebase';

const Upload = ({setStatus, setImg, setVideo, setProgress}) => {
    const [files, setFiles] = useState(null);
    // const [statusUpload, setStatusUpload] = useState(false);
    const handleUploadImg = () => {
        if(!files){
            alert("Chưa có bất kỳ tập tin nào !")
            return;
        }
        const uploadTask = storage.ref(`files/${files.name}`).put(files);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(snapshot.state === firebase.storage.TaskState.RUNNING){
                    console.log(`Progress: ${progress}%`);
                    setProgress(progress);
                }
            },
            error => console.log(error.code),
            async () => {
                await uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    setImg(url);
                })
            }
        )
    }

    const handleUploadVideo = () => {
        if(!files){
            alert("Chưa có bất kỳ tập tin nào !")
            return;
        }
        const uploadTask = storage.ref(`files/${files.name}`).put(files);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(snapshot.state === firebase.storage.TaskState.RUNNING){
                    console.log(`Progress: ${progress}%`);
                    setProgress(progress);
                }
            },
            error => console.log(error.code),
            async () => {
                await uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    setVideo(url);
                })
            }
        )
    }

    const uploadImg = () => {
        handleUploadImg();
        setStatus(false);
    }

    const uploadVideo = () => {
        handleUploadVideo();
        setStatus(false);
    }
    const stopPropagation = (e) => {
        e.stopPropagation();
    }
    return (
        <div>
            <div onClick={() => setStatus(false)} className="upload-main">
                <div onClick={stopPropagation} className="upload-file">
                    <div onClick={() => setStatus(false)} className="close-upload">
                        <i className="fa fa-times"></i>
                    </div>
                    <h1>UPLOAD</h1>
                    <div className="upload-center">
                        <div>
                            <div className="upload-img">
                                <label htmlFor="upload-img"><h3>Chọn ảnh</h3></label>
                                <input onChange={e => setFiles(e.target.files[0])} id="upload-img" type="file" />
                                <label onClick={uploadImg} className="ml-40"><h3>Upload ảnh</h3></label>
                            </div>
                            <div className="upload-video">
                                <label htmlFor="upload-video"><h3>Chọn video</h3></label>
                                <input onChange={e => setFiles(e.target.files[0])} id="upload-video" type="file" />
                                <label onClick={uploadVideo} className="ml-30"><h3>Upload video</h3></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload
