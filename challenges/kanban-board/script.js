const initialList = ["React", "Vue", "Angular"];
const textField = document.getElementById("textField");
const todoForm = document.getElementById("todoForm");
const todoTemplate = document.getElementById("todoTemplate");
const containers = document.querySelectorAll(".container");
const noItemTemplate = document.getElementById("noItemTemplate");

const handlenoElements = () => {
  containers.forEach((container) => {
    const noItem = container.querySelector(".noItem");
    const hasDragableItem = container.querySelector(".draggable");
    if (hasDragableItem && noItem) {
      noItem.remove();
    } else if (!hasDragableItem && !noItem) {
      container.appendChild(noItemTemplate.content.cloneNode(true));
    }
  });
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textField.value) {
    addItem(textField.value);
  }
});

const addItem = (item) => {
  const newItem = todoTemplate.content.cloneNode(true);
  newItem.querySelector(".text").textContent = item;
  containers[0].appendChild(newItem);
  textField.value = "";
  enableDraggingItems();
  handlenoElements();
};

const enableDraggingItems = () => {
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

initialList.forEach(addItem);

containers.forEach((container) => {
  handlenoElements();
  container.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete")) {
      target.parentElement.remove();
      handlenoElements();
    } else if (target.classList.contains("edit")) {
      const edit = target;
      const text = edit.parentElement.querySelector(".text");
      const input = document.createElement("input");
      input.value = text.textContent;
      edit.parentElement.replaceChild(input, text);
      edit.className = "save";
      edit.textContent = "💾";
    } else if (target.classList.contains("save")) {
      const save = target;
      const input = save.parentElement.querySelector("input");
      const text = document.createElement("span");
      text.className = "text";
      text.textContent = input.value;
      save.parentElement.replaceChild(text, input);
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
    enableDraggingItems();
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
