const email = "quentinjacksoncook@gmail.com";

document.querySelectorAll(".btn").forEach((button) => {
  if (button.disabled) {
    return;
  }

  button.addEventListener("click", () => {
    window.location.href = `mailto:${email}`;
  });
});
