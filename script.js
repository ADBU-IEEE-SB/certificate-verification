// Firebase configuration (replace with your own Firebase config)
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

// Firestore reference
const db = firebase.firestore();

function verifyCertificate() {
    const certificateId = document.getElementById('certificateId').value;
    const resultElement = document.getElementById('verificationResult');

    db.collection('certificates').doc(certificateId).get().then((doc) => {
        if (doc.exists) {
            resultElement.textContent = `Certificate is valid. Owner: ${doc.data().owner}`;
        } else {
            resultElement.textContent = 'Certificate not found';
        }
    }).catch((error) => {
        console.error('Error verifying certificate: ', error);
        resultElement.textContent = 'Error verifying certificate';
    });
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginResult = document.getElementById('loginResult');

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            loginResult.textContent = 'Login successful';
            document.getElementById('add-certificate').style.display = 'block';
            document.getElementById('login').style.display = 'none';
        })
        .catch((error) => {
            console.error('Error logging in: ', error);
            loginResult.textContent = 'Login failed: ' + error.message;
        });
}

function addCertificate() {
    const newCertificateId = document.getElementById('newCertificateId').value;
    const certificateOwner = document.getElementById('certificateOwner').value;
    const resultElement = document.getElementById('addResult');

    const user = firebase.auth().currentUser;
    if (user) {
        db.collection('certificates').doc(newCertificateId).set({
            owner: certificateOwner
        }).then(() => {
            resultElement.textContent = 'Certificate added successfully';
        }).catch((error) => {
            console.error('Error adding certificate: ', error);
            resultElement.textContent = 'Error adding certificate';
        });
    } else {
        resultElement.textContent = 'You must be logged in to add a certificate';
    }
}
