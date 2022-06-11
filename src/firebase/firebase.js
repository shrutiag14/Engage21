import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore';
// import {getAuth} from 'firebase/auth';
// import {getDatabase} from 'firebase/database';
// import {getFirestore} from 'firebase/firestore';
// import {getStorage} from 'firebase/storage';
// import {initializeApp} from 'firebase';


const app= firebase.initializeApp(
{ 
// 	apiKey: "AIzaSyBgYEI9LUP9bFraZ5o9-oWioN6CfR7ZCMg",
//     authDomain: "submission-tool.firebaseapp.com", 
//     projectId: "submission-tool",
//     storageBucket: "submission-tool.appspot.com",
//     messagingSenderId: "543103706014",
//     appId: "1:543103706014:web:9e2da15c014fc547ff6c8f"
	apiKey: "AIzaSyDgvuGDi8Oag9V1lDiPMadvukHT5JvpvmY",
  authDomain: "classroom-hub-e3f60.firebaseapp.com",
  projectId: "classroom-hub-e3f60",
  storageBucket: "classroom-hub-e3f60.appspot.com",
  messagingSenderId: "685217606480",
  appId: "1:685217606480:web:8429777406b65f1cff5a55"
    
})

console.log(app);
// const app= initializeApp(firebaseConfig);
// export const database=getDatabase(app)
// export const database = getFirestore(app);
// export const auth= getAuth(app)
// export const storage = getStorage()
export const database = app.firestore();
export const auth= app.auth()
export const storage = app.storage()


console.log(storage)
console.log(database)
export default app
