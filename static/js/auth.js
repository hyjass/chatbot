document.addEventListener("DOMContentLoaded", function () {
  // Password toggle functionality
  const togglePassword = document.querySelectorAll(".toggle-password");

  togglePassword.forEach((icon) => {
    icon.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      this.classList.toggle("fa-eye-slash");
    });
  });

  // Confirm password validation
  const confirmPassword = document.querySelector("#confirm_password");
  if (confirmPassword) {
    confirmPassword.addEventListener("input", function () {
      const password = document.querySelector("#password").value;
      if (this.value !== password) {
        this.setCustomValidity("Passwords don't match");
      } else {
        this.setCustomValidity("");
      }
    });
  }

  // Add animation to form elements
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((group, index) => {
    group.style.opacity = "0";
    group.style.transform = "translateY(20px)";
    group.style.transition = `all 0.3s ease ${index * 0.1}s`;

    setTimeout(() => {
      group.style.opacity = "1";
      group.style.transform = "translateY(0)";
    }, 100);
  });
});
