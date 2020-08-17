import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";
function ImageUpload({username})  {
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState('');

    const handleChange =  (e)=> {
       if(e.target.files[0]){
           setImage(e.target.files[0]);
       }
    };

    const handleUpload =  () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) =>{
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes ) * 100 
                )
                setProgress(progress);
            }, (error) =>{
                console.log(error);
                alert(error.message);
            }, 
            () => {
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption:   caption,
                        imageUrl:  url,
                        username:  username
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            });
    }

    return (
        <div className="app__imageupload">
            <progress className="app__progressbar" value={progress} max = "100" />
            <Input type="text" placeholder="Saisir votre caption ici..." onChange = {event => setCaption(event.target.value)} value={caption}/>
            <Input type="file" onChange = { handleChange } placeholder="fichier à télécharger."/>
            <Button onClick={handleUpload}  type="submit"> Télécharger </Button>
        </div>
    )
}

export default ImageUpload
