const container = document.getElementById("container");
const loader = document.getElementById("loader");

// educative.io website method
// const fetchData = (numImages = 10) => {
//   let i = 0;
//   loader.style.display = "block";
//   while (i < numImages) {
//     fetch("https://dog.ceo/api/breeds/image/random")
//       .then((response) => response.json())
//       .then((data) => {
//         const image = document.createElement("img");
//         image.src = `${data.message}`;
//         loader.style.display = "none";
//         container.appendChild(image);
//       })
//       .catch((error) => {
//         loader.style.display = "none";
//         console.error(error);
//       });
//     i++;
//   }
// };
// End

// geeksforgeeks website method
const resultContainer = document.getElementById("resultContainer");
let loading = false;
const fetchData = (numImages = 10) => {
  loading = true;
  let i = 0;
  loader.style.display = "block";
  while (i < numImages) {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        const image = document.createElement("img");
        image.src = `${data.message}`;
        loading = false;
        loader.style.display = "none";
        resultContainer.appendChild(image);
      })
      .catch((error) => {
        loading = false;
        loader.style.display = "none";
        console.error(error);
      });
    i++;
  }
};
// End

fetchData();

// educative.io website method
// window.addEventListener("scroll", () => {
//   if (
//     window.scrollY + window.innerHeight >=
//     document.documentElement.scrollHeight
//   ) {
//     fetchData();
//   }
// });
// End

// geeksforgeeks website method
container.addEventListener("scroll", () => {
  if (
    Math.ceil(container.scrollTop + container.clientHeight) >=
    container.scrollHeight
  ) {
    if (loading) return;
    fetchData();
  }
});
// End
