const inputField = document.getElementById("searchBar");
const suggestions = document.getElementById("suggestions");
const loader = document.getElementById("loader");
const info = document.getElementById("info");
let suggestionFocus = null;
let inputValue = "";

const resetSuggestions = () => {
  suggestions.innerHTML = "";
  suggestionFocus = null;
  inputField.value = inputValue;
};

const highlightSuggestion = (index) => {
  suggestions.querySelector(".item")?.classList.remove("item");
  suggestions.children[index].classList.add("item");
  inputField.value = suggestions.children[index].textContent;
};

const removeHighlightSuggestion = () => {
  suggestions.querySelector(".item")?.classList.remove("item");
  inputField.value = inputValue;
  suggestionFocus = null;
};

const showInfo = (message = "API error occured") => {
  info.textContent = message;
};

const showLoader = (loading = true) => {
  if (loading) {
    loader.textContent = "Loading...";
  } else {
    loader.textContent = "";
  }
};

const displayItems = (item) => {
  const li = document.createElement("li");
  li.textContent = item?.fullName;
  suggestions.appendChild(li);
};

const getData = async (text) => {
  try {
    let res = await fetch(
      `https://potterapi-fedeperin.vercel.app/es/characters?search=${text}`
    );
    res = await res.json();
    if (res?.length === 0) {
      showInfo("no data found");
    } else if (inputValue) {
      res.slice(0, 6).forEach(displayItems);
    }
  } catch (error) {
    console.error(error);
    showInfo();
  }
  showLoader(false);
};

const debounce = (func, ms) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(func, ms, ...args);
  };
};

const getDebouncedData = debounce(getData, 300);

// searchBar.addEventListener("input", (e) => {
//   inputValue = e.target.value;
//   resetSuggestions();
//   showInfo("");
//   if (inputValue === "") {
//     showLoader(false);
//   } else {
//     showLoader();
//     getDebouncedData(inputValue);
//   }
// });

searchBar.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && suggestionFocus !== null) {
    inputValue = suggestions.children[suggestionFocus].textContent;
    resetSuggestions();
    return;
  } else if (e.key === "ArrowUp") {
    e.preventDefault(); // prevents cursor moving to start of input field
    suggestionFocus = suggestionFocus ?? suggestions.children.length;
    if (suggestionFocus - 1 < 0) {
      removeHighlightSuggestion();
      return;
    }
    highlightSuggestion(--suggestionFocus);
  } else if (e.key === "ArrowDown") {
    suggestionFocus = suggestionFocus ?? -1;
    if (suggestionFocus + 1 >= suggestions.children.length) {
      removeHighlightSuggestion();
      return;
    }
    highlightSuggestion(++suggestionFocus);
  } else {
    inputValue = e.target.value;
    resetSuggestions();
    showInfo("");
    if (inputValue === "") {
      showLoader(false);
    } else {
      showLoader();
      getDebouncedData(inputValue);
    }
  }
});

// inputField.addEventListener("blur", () => {
//   setTimeout(resetSuggestions, 100);
// });

suggestions.addEventListener("click", (e) => {
  const element = e.target;
  if (element.tagName.toLowerCase() === "li") {
    inputValue = element.textContent;
    resetSuggestions();
  }
});
