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
  
  // Smooth scroll to section if coming from another page
  const target = localStorage.getItem("scrollTo");
  if (target) {
    const el = document.getElementById(target);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
    localStorage.removeItem("scrollTo");
  } 
  
  // Show user greeting if logged in
  document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      const authButtons = document.querySelector(".auth-buttons");
      if (authButtons) {
        authButtons.innerHTML = `
          <span>Welcome, ${user.username} 👋</span>
          <a href="#" onclick="logout()" class="logout-btn">Log Out</a>
        `;
      }
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
          location.reload();
        } else {
          alert("Invalid username or password!");
        }
      });
    }
  });
  
  // Log out
  function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
  }