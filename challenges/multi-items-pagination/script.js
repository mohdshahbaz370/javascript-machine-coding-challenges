const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const pageNumbers = document.getElementById("page-numbers");
const pageLinks = document.querySelectorAll(".page-link");
const cards = Array.from(document.getElementsByClassName("card"));
const cardsPerPage = 4; // Number of cards to show per page
let currentPage = 1;
// Calculate the total number of pages
const totalPages = Math.ceil(cards.length / cardsPerPage);

// Function to display cards for a specific page
function displayPage(page) {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  cards.forEach(function (card, index) {
    if (index < endIndex && index >= startIndex) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Function to update pagination buttons and page numbers
function updatePagination() {
  nextBtn.disabled = currentPage === totalPages;
  previousBtn.disabled = currentPage === 1;
  pageNumbers.textContent = `${currentPage} of ${totalPages}`;
  pageLinks.forEach(function (link) {
    const page = parseInt(link.getAttribute("data-page"));
    link.classList.toggle("active", page === currentPage);
  });
}

// Event listener for "Previous" button
previousBtn.addEventListener("click", function (e) {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
    updatePagination();
  }
});

// Event listener for "Next" button
nextBtn.addEventListener("click", function (e) {
  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
    updatePagination();
  }
});

// Event listener for page number buttons
pageLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const page = parseInt(link.getAttribute("data-page"));
    if (currentPage !== page) {
      currentPage = page;
      displayPage(currentPage);
      updatePagination();
    }
  });
});

// Initial page load
displayPage(currentPage);
updatePagination();
