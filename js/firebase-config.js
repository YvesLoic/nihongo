// ========================================
// Firebase Configuration
// ========================================

const firebaseConfig = {
    apiKey: "AIzaSyCprv0sV3ae-V6Zgfcxjuo-G_sDHcn9UwQ",
    authDomain: "nihongo-app-4e080.firebaseapp.com",
    projectId: "nihongo-app-4e080",
    storageBucket: "nihongo-app-4e080.firebasestorage.app",
    messagingSenderId: "850724991138",
    appId: "1:850724991138:web:df823b8b9cc4e970ed27fb"
};

firebase.initializeApp(firebaseConfig);

window.firebaseAuth = firebase.auth();
window.firebaseDb = firebase.firestore();
