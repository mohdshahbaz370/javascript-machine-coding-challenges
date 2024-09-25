const content = document.getElementById("content");
const button = document.getElementById("button");
const loader = document.getElementById("loader");
const totalItems = 10;
const ItemsPerPage = 3;
let currentItemCount = 3;

button.addEventListener("click", loadMoreItems);

function loadMoreItems() {
  button.style.display = "none";
  loader.style.display = "block";

  // simulate API delay
  setTimeout(() => {
    for (let i = 0; i < ItemsPerPage; i++) {
      // maximum number of items to load
      //   if (currentItemCount === 10) {
      //     break;
      //   }
      // End
      const p = document.createElement("p");
      p.textContent = `item ${currentItemCount + 1}`;
      content.appendChild(p);
      currentItemCount++;
    }
    loader.style.display = "none";
    if (currentItemCount >= totalItems) {
      button.style.display = "none";
    } else {
      button.style.display = "block";
    }
  }, 1000);
  // End
}
