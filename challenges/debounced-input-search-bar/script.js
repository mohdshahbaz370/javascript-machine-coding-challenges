const input = document.getElementById("searchBar");

const getData = () => {
  console.log("shahbaz");
};

const debounce = (func, ms) => {
  let timerId;
  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(func, ms);
  };
};

const debouncedFunction = debounce(getData, 1000);

input.addEventListener("keyup", (event) => {
  debouncedFunction();
});
