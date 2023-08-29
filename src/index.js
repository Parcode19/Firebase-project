import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkc630N7EVWy3dCn0bxYQa6_9LXr-oT-Y",
  authDomain: "first-project-4dd61.firebaseapp.com",
  projectId: "first-project-4dd61",
  storageBucket: "first-project-4dd61.appspot.com",
  messagingSenderId: "342580336958",
  appId: "1:342580336958:web:c7c3d9add8ac163ea0746f",
  measurementId: "G-KMX5GGTB0P"
};


// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
  .then ((snapshot) => {
    let books =[];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
  })

  .catch (err => {
    console.log(err.message)
  })