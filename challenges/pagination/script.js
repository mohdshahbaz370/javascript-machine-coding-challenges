document.addEventListener("DOMContentLoaded", function () {
  let currentPage = 1;
  const itemsPerPage = 3;
  const totalItems = 10;
  const paginationDiv = document.getElementById("pagination");
  const contentDiv = document.getElementById("content");
  function displayContent(page) {
    contentDiv.innerHTML = "";
    for (let i = (page - 1) * itemsPerPage + 1; i <= page * itemsPerPage; i++) {
      contentDiv.innerHTML += `<p>${i} item</p>`;
    }
  }

  function generatePagination() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationDiv.innerHTML = "";
    const prev = document.createElement("span");
    prev.textContent = "←";
    prev.id = "prev";
    prev.addEventListener("click", function (e) {
      if (currentPage > 1) {
        currentPage--;
        displayContent(currentPage);
        generatePagination();
      }
    });
    paginationDiv.appendChild(prev);
    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = i;
      link.className = "link";
      if (i === currentPage) {
        link.classList.add("active");
      }
      link.addEventListener("click", function (e) {
        currentPage = i;
        displayContent(currentPage);
        generatePagination();
      });
      paginationDiv.appendChild(link);
    }
    const next = document.createElement("span");
    next.textContent = "→";
    next.id = "next";
    next.addEventListener("click", function (e) {
      if (currentPage < totalPages) {
        currentPage++;
        displayContent(currentPage);
        generatePagination();
      }
    });
    paginationDiv.appendChild(next);
  }

  // Initial page load
  displayContent(currentPage);
  generatePagination();
});
