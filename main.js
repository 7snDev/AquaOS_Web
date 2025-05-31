document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("keydown", async (event) => {
  if (event.key == "F12" || event.key == "F11" || event.key == "F5") {
    event.preventDefault();
  }
});

if (window.sessionStorage.getItem("first") == null) {
  window.sessionStorage.setItem("first", "true");
  setTimeout(() => {
    document.querySelector(".logo").remove();
    document.querySelector(".text").remove();
    document.querySelector(".prompt").style.visibility = "visible";
    document.querySelector(".welcome").style.visibility = "visible";
  }, 3500);
} else {
  document.querySelector(".logo").remove();
  document.querySelector(".text").remove();
  document.querySelector(".prompt").style.visibility = "visible";
  document.querySelector(".welcome").style.visibility = "visible";
}