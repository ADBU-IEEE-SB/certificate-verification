function verifyCertificate() {
  const certId = document.getElementById('certId').value;
  const certDetails = document.getElementById('certDetails');

  db.collection('certificates').doc(certId).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      certDetails.innerHTML = `
        <p>Event Name: ${data.eventName}</p>
        <p>Certification Type: ${data.certType}</p>
        <p>Receiver's Name: ${data.receiverName}</p>
        <p>Receiver's Email: ${data.receiverEmail}</p>
        <p><a href="${data.certLink}" target="_blank">View Certificate</a></p>
      `;
    } else {
      certDetails.innerHTML = '<p>Certificate not found.</p>';
    }
  }).catch(error => {
    console.error('Error fetching certificate:', error);
    certDetails.innerHTML = '<p>Error fetching certificate.</p>';
  });
}
