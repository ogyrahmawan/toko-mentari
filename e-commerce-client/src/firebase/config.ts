import firebase from 'firebase'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBTj2fcpukw7pp-LAEe67e6wbeS6Ae8E2U",
  authDomain: "toko-mentari.firebaseapp.com",
  projectId: "toko-mentari",
  storageBucket: "toko-mentari.appspot.com",
  messagingSenderId: "247392192471",
  appId: "1:247392192471:web:d283df05146250f0cf2d92"
  };
  if (!firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig)
    } catch (err) {
        console.log(`Firebase initialization error raised’, err.stack`)
    }
}

export default firebase