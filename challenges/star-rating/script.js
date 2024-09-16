const starContainer = document.getElementById("starContainer");
const smileyContainer = document.getElementById("smileyContainer");

const starSize = 5;
const smileys = ["😢", "😞", "😐", "😀", "😎"];
let rating = 0;
let filled = 0;
let unfilled = 0;

function createElement(type, attributes) {
  const element = document.createElement(type);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}

function createElements(size, func, start = 0) {
  const fragment = document.createDocumentFragment();
  for (let i = start; i < size + start; i++) {
    fragment.appendChild(func(i));
  }
  return fragment;
}

function setSmiley(rating) {
  const index = Math.ceil((rating * smileys.length) / starSize) - 1;
  smileyContainer.textContent = smileys[index];
}

starContainer.appendChild(
  createElements(
    starSize,
    (i) =>
      createElement("button", { class: "star star-empty", "data-index": i }),
    1
  )
);

const stars = starContainer.querySelectorAll(".star");

starContainer.addEventListener("click", handleClicklistener);
starContainer.addEventListener("mouseover", handleMouseOver);
starContainer.addEventListener("mouseleave", handleMouseLeave);

function fillStars(rating) {
  for (let i = filled; i < rating; i++) {
    stars[i].classList.add("star-filled");
    stars[i].classList.remove("star-empty");
  }
  for (let i = rating; i < unfilled; i++) {
    stars[i].classList.remove("star-filled");
    stars[i].classList.add("star-empty");
  }
  filled = rating;
  unfilled = rating;
}

function handleClicklistener(e) {
  const target = e.target;
  if (target.classList.contains("star")) {
    rating = +target.dataset.index;
    fillStars(rating);
    setSmiley(rating);
  }
}

function handleMouseOver(e) {
  const target = e.target;
  if (target.classList.contains("star")) {
    console.log("...", typeof target.dataset.index);
    const index = +target.dataset.index;
    fillStars(index);
  }
}

function handleMouseLeave() {
  fillSmileys(+rating);
}
