const initialList = ["React", "Vue", "Angular"];
const textField = document.getElementById("textField");
const listContainer = document.getElementById("listContainer");
const todoForm = document.getElementById("todoForm");
const todoTemplate = document.getElementById("todoTemplate");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textField.value) {
    addItems(textField.value);
    if (listContainer.children.length === 1) handlleNoElements();
  }
});

listContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    handlleNoElements();
  } else if (e.target.classList.contains("edit")) {
    const edit = e.target;
    const text = edit.parentElement.querySelector(".text");
    const input = document.createElement("input");
    edit.parentElement.replaceChild(input, text);
    input.value = text.textContent;
    edit.className = "save";
    edit.textContent = "💾";
  } else if (e.target.classList.contains("save")) {
    const save = e.target;
    const input = save.parentElement.querySelector("input");
    const text = document.createElement("span");
    text.className = "text";
    save.parentElement.replaceChild(text, input);
    text.textContent = input.value;
    save.className = "edit";
    save.textContent = "✏️";
  }
});

const addItems = (item) => {
  const li = todoTemplate.content.cloneNode(true);
  li.querySelector(".text").textContent = item;
  listContainer.appendChild(li);
  textField.value = "";
};

initialList.forEach(addItems);

const handlleNoElements = () => {
  if (listContainer.children.length > 0) {
    document.getElementById("noElements").style.display = "none";
  } else {
    document.getElementById("noElements").style.display = "block";
  }
};

handlleNoElements();
