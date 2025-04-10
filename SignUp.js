// Open the login modal
function openLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
      modal.style.display = "block";
    }
}

// Close the login modal
function closeLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
      modal.style.display = "none";
    }
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
};

// Handle registration form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signUpForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const user = {
        fullName: document.getElementById("signupFullname").value,
        email: document.getElementById("signupEmail").value,
        username: document.getElementById("signupUsername").value,
        password: document.getElementById("signupPassword").value,
        confirm: document.getElementById("signupConfirm").value
      };

      if (user.password !== user.confirm) {
        alert("Passwords do not match!");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      window.location.href = "main.html";
    });
  }

  // Handle login form submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (existingUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
        closeLoginModal();
        window.location.href = "main.html";
      } else {
        alert("Invalid username or password!");
      }
    });
  }
});
