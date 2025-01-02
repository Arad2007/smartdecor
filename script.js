// Face Recognition and Fingerprint Authentication Logic
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const cameraView = document.getElementById('cameraView');
    const cameraFeed = document.getElementById('cameraFeed');
    const captureButton = document.getElementById('captureButton');
    const recognizeButton = document.getElementById('recognizeButton');
    const captureCanvas = document.getElementById('captureCanvas');
    const resultBox = document.getElementById('result-box');
    const resultText = document.getElementById('result');
    let cameraStream;
  
    // Start camera stream
    startButton.addEventListener('click', async () => {
      try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraFeed.srcObject = cameraStream;
        cameraView.style.display = 'block';
        startButton.style.display = 'none'; // Hide the start button
      } catch (err) {
        console.error('Error accessing camera:', err);
        resultText.textContent = `Error accessing camera: ${err}`;
        resultBox.style.display = 'block';
      }
    });
  
    // Capture face image
    captureButton.addEventListener('click', async () => {
      try {
        const canvasContext = captureCanvas.getContext('2d');
        canvasContext.drawImage(cameraFeed, 0, 0, captureCanvas.width, captureCanvas.height);
  
        captureCanvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append('image', blob, 'capturedImage.jpg');
  
          // Send image to backend for saving
          const response = await fetch('/upload-face', {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            resultText.textContent = 'Face data saved successfully.';
            resultBox.style.display = 'block';
          } else {
            resultText.textContent = 'Error: Face data not saved successfully.';
            resultBox.style.display = 'block';
          }
  
          const data = await response.json();
          console.log(data);
        }, 'image/jpeg');
      } catch (error) {
        console.error('Error during image capture:', error);
        resultText.textContent = 'Error during image capture: ' + error;
        resultBox.style.display = 'block';
      }
    });
  
    // Recognize captured face
    recognizeButton.addEventListener('click', async () => {
      try {
        const canvasContext = captureCanvas.getContext('2d');
        canvasContext.drawImage(cameraFeed, 0, 0, captureCanvas.width, captureCanvas.height);
  
        captureCanvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append('image', blob, 'capturedImage.jpg');
  
          // Send image to backend for recognition
          const response = await fetch('/recognize-face', {
            method: 'POST',
            body: formData,
          });
  
          const data = await response.json();
          if (response.ok) {
            resultText.textContent = data.message;
            resultBox.style.display = 'block';
  
            // If face recognized, jump to index.html
            setTimeout(() => {
              window.location.href = 'index.html'; // Redirect on success
            }, 1000);
          } else {
            resultText.textContent = 'Face not recognized.';
            resultBox.style.display = 'block';
          }
        }, 'image/jpeg');
      } catch (error) {
        console.error('Error during face recognition:', error);
        resultText.textContent = 'Error during face recognition: ' + error;
        resultBox.style.display = 'block';
      }
    });
  
    // Fingerprint authentication (optional)
    const fingerprintButton = document.getElementById('fingerprintButton');
    const fingerprintResultBox = document.getElementById('fingerprint-result-box');
    const fingerprintResult = document.getElementById('fingerprint-result');
  
    fingerprintButton.addEventListener('click', async () => {
      try {
        fingerprintResult.textContent = 'Initializing fingerprint authentication...';
  
        // Example of fingerprint authentication flow (you'll need to integrate WebAuthn or a similar API for real-world use)
        const fingerprintVerified = await fakeFingerprintScan();
  
        if (fingerprintVerified) {
          fingerprintResult.textContent = 'Fingerprint authentication successful! Redirecting...';
          setTimeout(() => {
            window.location.href = 'index.html'; // Redirect on success
          }, 1000);
        } else {
          fingerprintResult.textContent = 'Fingerprint authentication failed.';
        }
      } catch (error) {
        fingerprintResult.textContent = 'Error: ' + error;
      }
    });
  
    // Fake fingerprint scan for demonstration (replace with actual fingerprint API)
    async function fakeFingerprintScan() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true); // Simulate a successful fingerprint scan
        }, 2000);
      });
    }
  });
