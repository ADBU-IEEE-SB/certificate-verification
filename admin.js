const loginContainer = document.getElementById('login-container');
const certFormContainer = document.getElementById('certForm-container');

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  signIn(email, password);
});

function signIn(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.error('Error during sign-in:', error);
    });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
}

auth.onAuthStateChanged(user => {
  if (user) {
    loginContainer.style.display = 'none';
    certFormContainer.style.display = 'block';

    document.getElementById('certForm').addEventListener('submit', (e) => {
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
    loginContainer.style.display = 'block';
    certFormContainer.style.display = 'none';
  }
});
