// dynamic data
// const arr = [
//   {
//     id: 1,
//     url: "https://imgs.search.brave.com/bAdI7a7qnuuOIJphttt3DfbzLnCU7ZDMtnkejXq6UII/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMTAwMDkz/OC81NDk5L2kvNDUw/L2RlcG9zaXRwaG90/b3NfNTQ5OTg2MTMt/c3RvY2stcGhvdG8t/Z2luZ2VyLWNhdC5q/cGc",
//   },
//   {
//     id: 2,
//     url: "https://imgs.search.brave.com/lZtf1S7JKFcaZs2lhxTpAtaJzTk_V35Xt8ys4htuVBU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/Y2F0LXBvc2VzLXBl/cmZlY3RseS5qcGc_/d2lkdGg9MTAwMCZm/b3JtYXQ9cGpwZyZl/eGlmPTAmaXB0Yz0w",
//   },
//   {
//     id: 3,
//     url: "https://imgs.search.brave.com/t6Nv0DwxoIACRxxtX2h7yt31ux5SCXHWgHVpoGh1diw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzM2Lzk5LzIy/LzM2MF9GXzIzNjk5/MjI4M19zTk94Q1ZR/ZUZMZDVwZHFhS0do/OERSR01aeTdQNFhL/bS5qcGc",
//   },
// ];

// const template = document.getElementById("template");
// arr.forEach(function (itm) {
//   const slides = template.content.cloneNode(true);
//   slides.querySelector(".text").textContent = `cat ${itm.id}`;
//   const img = slides.querySelector("img");
//   img.src = itm.url;
//   img.alt = "cat_pic";
//   document.getElementById("slideShowContainer").prepend(slides);
// });
// End

// static data
let slideIndex = 1;
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
