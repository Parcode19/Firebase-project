import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection,
  addDoc, deleteDoc, doc, onSnapshot,
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc
} from "firebase/firestore";
import {
  getAuth, createUserWithEmailAndPassword, 
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"

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
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, 'books');

// queries
const q = query(colRef, orderBy("createdAt"))

// real time collection data
const unsubCol = onSnapshot(q, (snapshot) => {
  let books =[];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books);
})

// adding docs
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp() 
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
  .then(() => {
    deleteBookForm.reset()
  })
})

// get a single document
const docRef = doc(db, 'books', 'A6mCepVv5cd3Fb7xmJml')

getDoc(docRef)
  .then((doc) => {
    // console.log(doc.data(), doc.id)
  })

// realtime listener to that single document
const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})


// update a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: "updated title"
  })
  .then(() => {
    updateForm.reset()
  })
})


// signing users up
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    // console.log('user created: ',cred.user)
    signupForm.reset()
  })
  .catch((err) => {
    console.log(err.mes)
  })
})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      // console.log("User logged out")
    })
    .catch((err) => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // console.log('user logged  in: ',cred.user)
      signupForm.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log('user status changed: ', user)
})

// unsubscribing from changes (auth & db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
  console.log('unsubscribing')
  unsubCol()
  unsubDoc()
  unsubAuth()
})