// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAruAhlCwlG9s_huCHy-Fz93WHe1UNIOnI",
  authDomain: "document-sharing-app-f3810.firebaseapp.com",
  projectId: "document-sharing-app-f3810",
  storageBucket: "document-sharing-app-f3810.firebasestorage.app",
  messagingSenderId: "504358878192",
  appId: "1:504358878192:web:9dc2e89a64717ee80bbb35",
  measurementId: "G-XMSQJJGFHE"
};

// Initialize Firebase (V9+)
// Firebase App (core)
const app = firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
