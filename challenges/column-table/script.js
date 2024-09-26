const rowInput = document.getElementById("row");
const columnInput = document.getElementById("column");
const tbody = document.getElementById("tbody");

let rows = +rowInput.value;
let columns = +columnInput.value;

const generateMatrix = (rows, columns) => {
  let count = 0;
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      row.push(count);
      count++;
    }
    matrix.push(row);
  }
  return matrix;
};

const generateTable = (rows, columns) => {
  const matrix = generateMatrix(rows, columns);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      const td = document.createElement("td");
      td.textContent = matrix[i][j];
      tr.appendChild(td);
    }
    fragment.appendChild(tr);
  }
  tbody.replaceChildren(fragment);
};

const updateTable = () => {
  generateTable(rows, columns);
};

rowInput.addEventListener("change", () => {
  rows = +rowInput.value;
  updateTable();
});
columnInput.addEventListener("change", () => {
  columns = +columnInput.value;
  updateTable();
});
updateTable();
