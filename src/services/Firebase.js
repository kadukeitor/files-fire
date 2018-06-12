import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL:process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

export const firestore = () => {
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);
    return db;
};

export const checkFile = (file) => {
    const currentUser = firebase.auth().currentUser;
    const db = firestore();
    const filesRef = db.collection(`users/${currentUser.uid}/files`);
    const filesQuery = filesRef.where("name", "==", file.name);
    return new Promise(resolve => {
        filesQuery.get().then(querySnapshot => {
            if (querySnapshot.docs.length) {
                let doc = querySnapshot.docs[0];
                resolve(Object.assign({id: doc.id}, doc.data()))
            } else {
                resolve(null);
            }
        });
    });
};

export const uploadFile = (file) => {
    const currentUser = firebase.auth().currentUser;
    const storage = firebase.storage().ref();
    const storageRef = storage.child(`users/${currentUser.uid}/files/${file.name}`);
    const db = firestore();
    return new Promise(resolve => {
        Promise.all([
            storageRef.put(file),
            db.collection(`users/${currentUser.uid}/files`).add({
                name: file.name,
                size: file.size,
                type: file.type,
                created: new Date().getTime(),
                modified: file.lastModified
            })
        ]).then((result) => {
            resolve(result);
        });
    });
};

export const overwriteFile = (file, fileExisting) => {
    const currentUser = firebase.auth().currentUser;
    const storage = firebase.storage().ref();
    const storageRef = storage.child(`users/${currentUser.uid}/files/${file.name}`);
    const db = firestore();
    return new Promise(resolve => {
        Promise.all([
            storageRef.put(file),
            db.collection(`users/${currentUser.uid}/files`).doc(fileExisting.id).set({
                name: file.name,
                size: file.size,
                type: file.type,
                created: new Date().getTime(),
                modified: file.lastModified
            })
        ]).then((result) => {
            resolve(result);
        });
    });
};

export const downloadFile = (file) => {
    const currentUser = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref(`users/${currentUser.uid}/files/${file.name}`);
    storageRef.getDownloadURL()
        .then(url => {
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', file.name);
            link.setAttribute('target', '_blank');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
};

export const deleteFile = (file) => {
    const currentUser = firebase.auth().currentUser;
    const storage = firebase.storage().ref();
    const storageRef = storage.child(`users/${currentUser.uid}/files/${file.name}`);
    const db = firestore();
    return new Promise(resolve => {
        Promise.all([
            storageRef.delete(),
            db.collection(`users/${currentUser.uid}/files`).doc(file.id).delete()
        ]).then((result) => {
            resolve(result);
        });
    });
};

export default firebase;