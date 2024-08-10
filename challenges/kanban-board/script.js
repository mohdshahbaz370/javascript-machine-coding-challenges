const initialList = ["React", "Vue", "Angular"];
const textField = document.getElementById("textField");
const todoForm = document.getElementById("todoForm");
const todoTemplate = document.getElementById("todoTemplate");
const containers = document.querySelectorAll(".container");
const noItemTemplate = document.getElementById("noItemTemplate");

const handlenoElements = () => {
  containers.forEach((container) => {
    if (container.children.length === 3) {
      const noItem = container.querySelector(".noItem");
      if (noItem) noItem.remove();
    } else if (container.children.length === 1) {
      const noItem = noItemTemplate.content.cloneNode(true);
      container.appendChild(noItem);
    }
  });
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textField.value) {
    addItems(textField.value);
  }
});

const addItems = (item) => {
  const li = todoTemplate.content.cloneNode(true);
  li.querySelector(".text").textContent = item;
  containers[0].appendChild(li);
  textField.value = "";
  enableDraggingElements();
  handlenoElements();
};

const enableDraggingElements = () => {
  const draggables = document.querySelectorAll(".draggable");
  draggables.forEach((dragabble) => {
    dragabble.addEventListener("dragstart", () => {
      dragabble.classList.add("dragging");
    });
    dragabble.addEventListener("dragend", () => {
      dragabble.classList.remove("dragging");
      handlenoElements();
    });
  });
};

initialList.forEach(addItems);

containers.forEach((container) => {
  handlenoElements();
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      e.target.parentElement.remove();
      handlenoElements();
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
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const aferElement = getDragAfterElement(container, e.clientY);
    const draggedElement = document.querySelector(".dragging");
    if (!aferElement) {
      container.appendChild(draggedElement);
    } else {
      container.insertBefore(draggedElement, aferElement);
    }
    enableDraggingElements();
  });
});

const getDragAfterElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};
