document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission for demonstration purposes
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const termsAccepted = document.getElementById('terms').checked;
  
    if (!name || !email || !password || !termsAccepted) {
      alert('Please fill out all fields and accept the terms and policy.');
      return;
    }
  
    alert('Form submitted successfully!');
  });