
  
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
  

  });
  
