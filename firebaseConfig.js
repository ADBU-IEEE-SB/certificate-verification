const firebaseConfig = {
  apiKey: "AIzaSyAoglb9c-M8bcC8kbk8CBDvJxDGA0ZTiFg",
  authDomain: "certificate-verification-b6070.firebaseapp.com",
  projectId: "certificate-verification-b6070",
  storageBucket: "certificate-verification-b6070.appspot.com",
  messagingSenderId: "348227015318",
  appId: "1:348227015318:web:8b3aef8102e0443d40a8b7",
  measurementId: "G-CWKFWKDNF3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
