const input = document.getElementById("searchBar");

const getData = () => {
  console.log("shahbaz");
};

const debounce = (func, ms) => {
  let intervalId;
  return () => {
    clearInterval(intervalId);
    intervalId = setTimeout(func, ms);
  };
};

const debouncedFunction = debounce(getData, 1000);

input.addEventListener("keyup", (event) => {
  debouncedFunction();
});
