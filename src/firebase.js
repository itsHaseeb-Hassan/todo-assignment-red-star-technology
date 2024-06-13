import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:"AIzaSyCKa6UElkyh6kCTeJ45DTCTf-340tudW5o",
  authDomain: "todo-app-d0d28.firebaseapp.com",
  projectId:"todo-app-d0d28",
  storageBucket:"todo-app-d0d28.appspot.com",
  messagingSenderId:"832620390025",
  appId:"1:832620390025:web:405a60ca9e747ef7690858"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);