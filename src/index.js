import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbdKCPI7jnKZglljA8M1ja4XFiiiZh-kM",
  authDomain: "fir-81cd1.firebaseapp.com",
  projectId: "fir-81cd1",
  storageBucket: "fir-81cd1.appspot.com",
  messagingSenderId: "213635184013",
  appId: "1:213635184013:web:a2d6d828b3d3856545f9c4",
};

//*init firebase app
initializeApp(firebaseConfig);

//* init Service
const db = getFirestore();

//*collection refreance
const collRef = collection(db, "books");

//* get collection data
getDocs(collRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })

  .catch((err) => {
    console.log(err.message);
  });

//*Adding Documnets
const addBook = document.querySelector(".add");
addBook.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(collRef, {
    title: addBook.title.value,
    author: addBook.author.value,
  }).then(() => {
    addBook.reset();
  });
 
});

//*Deleting documents

const deleteBook = document.querySelector(".delete");
deleteBook.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBook.id.value);

  deleteDoc(docRef).then(() => {
    deleteBook.reset();
  });
});
