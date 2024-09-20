const toastHorizontalPosition = document.getElementById("horizontalPosition");
const toastVerticalPosition = document.getElementById("verticalPosition");
const toastType = document.getElementById("type");
const toastDuration = document.getElementById("duration");
const toastMessage = document.getElementById("message");
const submit = document.getElementById("submit");
const leftTopContainer = document.querySelector(".left-top");
const leftBottomContainer = document.querySelector(".left-bottom");
const rightTopContainer = document.querySelector(".right-top");
const rightBottomContainer = document.querySelector(".right-bottom");
const toastTemplate = document.getElementById("toastTemplate");

toastMessage.addEventListener("input", handleMessage);

function handleMessage() {
  submit.disabled = toastMessage.value.length === 0;
}

submit.addEventListener("click", displayToast);

function displayToast() {
  const message = toastMessage.value;
  const horizontalPosition = toastHorizontalPosition.value;
  const verticalPosition = toastVerticalPosition.value;
  let duration = toastDuration.value;
  const type = toastType.value;
  duration = +duration * 1000;
  showToast(message, horizontalPosition, verticalPosition, type, duration);
}

function showToast(
  message,
  horizontalPosition,
  verticalPosition,
  type,
  duration
) {
  if (horizontalPosition === "left") {
    if (verticalPosition === "top") {
      leftTopContainer.prepend(createToast(message, type, duration));
    } else {
      leftBottomContainer.append(createToast(message, type, duration));
    }
  } else {
    if (verticalPosition === "top") {
      rightTopContainer.prepend(createToast(message, type, duration));
    } else {
      rightBottomContainer.append(createToast(message, type, duration));
    }
  }
}

function createToast(message, type, duration) {
  const toast = toastTemplate.content.cloneNode(true);
  toast.querySelector(".toastMessage").textContent = message;
  toast.querySelector(".toast").classList.add(type);
  toast.querySelector(".remove").addEventListener("click", () => removeToast());
  const toastEL = toast.querySelector(".toast");
  setTimeout(() => removeToast(), duration);
  function removeToast() {
    toastEL.remove();
  }
  return toast;
}
