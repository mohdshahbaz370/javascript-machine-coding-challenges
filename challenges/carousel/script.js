let slideIndex = 1;
let i;
const dots = document.getElementsByClassName("dots");
const slides = document.getElementsByClassName("slides");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
showSlides(slideIndex);
prev.addEventListener("click", function () {
  plusSlides(-1);
});
next.addEventListener("click", function () {
  plusSlides(1);
});

for (let j = 0; j < dots.length; j++) {
  dots[j].addEventListener("click", function () {
    currentSlide(j + 1);
  });
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  let i;
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Automatic Slideshow
// let slideIndex = 0;
// showSlides();
// function showSlides() {
//   let i;
//   const dots = document.getElementsByClassName("dots");
//   const slides = document.getElementsByClassName("slides");
//   slideIndex++;
//   if (slideIndex > slides.length) {
//     slideIndex = 1;
//   }
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
//   setTimeout(showSlides, 2000);
// }
// End
