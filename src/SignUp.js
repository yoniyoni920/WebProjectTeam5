document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signUpForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const user = {
        fullName: document.getElementById("signupFullname").value,
        email: document.getElementById("signupEmail").value,
        username: document.getElementById("signupUsername").value,
        password: document.getElementById("signupPassword").value,
        confirm: document.getElementById("signupConfirm").value
      };

      if (!captcha.validateCaptcha()) {
        alert("Captcha incorrect. Please try again.");
        return;
      }

      if (user.password !== user.confirm) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        });

        if (response.ok) {
          alert('Registration successful!');
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          window.location.href = "main.html";
        } else {
          alert('Failed to register user.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }
});
