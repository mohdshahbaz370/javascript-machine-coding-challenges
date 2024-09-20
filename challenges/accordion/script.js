const accordion = document.getElementsByClassName("accordion");
for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    // close all panels
    // for (let j = 0; j < accordion.length; j++) {
    //   accordion[j].nextElementSibling.style.display = "none";
    // }

    // Toggle the clicked panel
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
