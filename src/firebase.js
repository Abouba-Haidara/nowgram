import firebase  from "firebase"

const firebaseApp =  firebase.initializeApp({
    apiKey: "AIzaSyBtKbgYPi_rRc3rM6Yj9pJB3FRP3ue5c9o",
    authDomain: "nowgram-d0158.firebaseapp.com",
    databaseURL: "https://nowgram-d0158.firebaseio.com",
    projectId: "nowgram-d0158",
    storageBucket: "nowgram-d0158.appspot.com",
    messagingSenderId: "116073859122",
    appId: "1:116073859122:web:39ec89144dbeef4a90542b",
    measurementId: "G-B3KLDKCJP4"
});

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage =  firebase.storage();

export { db, auth, storage };
