const email = "quentinjacksoncook@gmail.com";

const sculpturesList = document.querySelector(".sculptures-list");

if (sculpturesList) {
  const shuffledItems = Array.from(sculpturesList.children)
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

  shuffledItems.forEach((item) => sculpturesList.appendChild(item));
}

document.querySelectorAll(".btn").forEach((button) => {
  if (button.disabled) {
    return;
  }

  button.addEventListener("click", () => {
    window.location.href = `mailto:${email}`;
  });
});
