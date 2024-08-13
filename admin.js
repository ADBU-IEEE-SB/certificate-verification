auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in
    const certForm = document.getElementById('certForm');
    certForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const certId = document.getElementById('certId').value;
      const eventName = document.getElementById('eventName').value;
      const certType = document.getElementById('certType').value;
      const receiverName = document.getElementById('receiverName').value;
      const receiverEmail = document.getElementById('receiverEmail').value;
      const certLink = document.getElementById('certLink').value;

      db.collection('certificates').doc(certId).set({
        eventName,
        certType,
        receiverName,
        receiverEmail,
        certLink
      }).then(() => {
        alert('Certificate added successfully!');
      }).catch(error => {
        console.error('Error adding certificate:', error);
      });
    });
  } else {
    // User is signed out
    window.location.href = 'index.html'; // Redirect to index if not signed in
  }
});

// Logout function
function logout() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
}

// Sign in function (for admin only)
function signIn(email, password) {
  auth.signInWithEmailAndPassword(email, password).catch(error => {
    console.error('Error during sign-in:', error);
  });
}
