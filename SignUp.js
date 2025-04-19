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


      if (captcha.validateCaptcha()) {
        alert('Registration successful (CAPTCHA passed)!.');
        if (user.password === user.confirm) {

           
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            //saveToLocalStorage(user);
            window.location.href = "main.html";
            //alert('Registration successful (CAPTCHA passed and data saved)!');
         }
         else{
          alert("Passwords do not match!");
          return;
         }
    }
    else{
        alert("Chaptcha Incorrect, Please try Again.");
        return;

    }
    });
  }
 // Function to generate fake user data
 function generateFakeUsers(num) {
  const fakeUsers = [];
  for (let i = 0; i < num; i++) {
    const user = {
      fullName: `Fake User ${i + 1}`,
      email: `fakeuser${i + 1}@example.com`,
      username: `fakeuser${i + 1}`,
      password: `password${i + 1}`,
      confirm: `password${i + 1}`
    };
    fakeUsers.push(user);
  }

  // Save fake users to localStorage
  localStorage.setItem("users", JSON.stringify(fakeUsers));
  alert(`${num} fake users have been added to localStorage.`);
}

// Call the function to add fake users
// You can change the number to however many fake users you need
generateFakeUsers(10); // Example: Adds 10 fake users
});
  

