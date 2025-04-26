async function getUsers() {
  try {
    const response = await fetch('/data.json');
    const users = await response.json();
    console.log(users); // All users
    return users;
  } catch (error) {
    console.error('Failed to load users:', error);
  }
}

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


document.addEventListener("DOMContentLoaded",async function () {
  const users = await getUsers();
 // if (users) {
  //  localStorage.setItem("users", JSON.stringify(users));
 // }


  // Handle login form submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;

      const currentUsers=users.users;
      const existingUser = currentUsers.find(
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

  // Log out
  function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
  }
 