const content = document.getElementById("content");
const button = document.getElementById("button");
const loader = document.getElementById("loader");
const totalItems = 10;
const ItemsPerPage = 3;
let currentNoofitems = 3;

button.addEventListener("click", loadMoreItems);

function loadMoreItems() {
  button.style.display = "none";
  loader.style.display = "block";

  // simulate API delay
  setTimeout(() => {
    for (let i = 0; i < ItemsPerPage; i++) {
      const p = document.createElement("p");
      p.textContent = `item ${currentNoofitems + 1}`;
      content.appendChild(p);
      currentNoofitems++;
    }
    loader.style.display = "none";
    if (currentNoofitems >= totalItems) {
      button.style.display = "none";
    } else {
      button.style.display = "block";
    }
  }, 1000);
  // End
}
