// Firebase template — copy into project and fill config to enable persistence
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
}

// Example usage (in module page):
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js'
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js'
// const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)
