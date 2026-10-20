const START = 24;
let count = START;
let liked = false;

const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");
const resetBtn = document.getElementById("resetBtn");
const darkToggle = document.getElementById("darkToggle");
const navLinks = document.querySelectorAll("nav a");
const note = document.getElementById("note");

function render() {
  likeCount.textContent = count;
  likeBtn.classList.toggle("liked", liked);
}

// Like / unlike
likeBtn.addEventListener("click", () => {
  liked = !liked;
  count += liked ? 1 : -1;
  render();
});

// Reset
resetBtn.addEventListener("click", () => {
  count = START;
  liked = false;
  render();
});

// Dark mode (saved in localStorage)
function setDark(on) {
  document.body.classList.toggle("dark", on);
  darkToggle.checked = on;
  localStorage.setItem("dark", on);
}

darkToggle.addEventListener("change", () => setDark(darkToggle.checked));
setDark(localStorage.getItem("dark") === "true");

// Nav: highlight clicked link, show a note for pages that don't exist yet
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    const name = link.textContent;
    note.hidden = name === "Home";
    note.textContent = name + " page is coming soon.";
  });
});

render();