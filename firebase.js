// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

// KushComics Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyASQnRKrIHaQ2MNaESuwVTF9R24-O1ZuQM",
  authDomain: "kushcomics-ca4ce.firebaseapp.com",
  projectId: "kushcomics-ca4ce",
  storageBucket: "kushcomics-ca4ce.firebasestorage.app",
  messagingSenderId: "290341591756",
  appId: "1:290341591756:web:49e792cf1be8e2c1084069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// Make services available to other modules
export {
  app,
  auth,
  googleProvider,
  db,
  storage
};
