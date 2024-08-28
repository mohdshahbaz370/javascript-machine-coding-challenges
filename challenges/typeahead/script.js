const searchBar = document.getElementById("searchBar");
const ul = document.getElementById("suggestions");
const lists = ul.children;
let position = null;
let state = "";

const displayItems = (item) => {
  const li = document.createElement("li");
  li.innerText = item.fullName;
  li.addEventListener("mouseover", (e) => {
    if (state === "arrowDown") {
      lists[position - 1].className = "";
    } else if (state === "arrowUp") {
      lists[position + 1].className = "";
    }
    li.className = "item";
    searchBar.value = li.innerText;
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].className === "item") {
        position = i;
        state = "mouseOver";
      }
    }
  });
  li.addEventListener("mouseleave", (e) => {
    li.className = "";
  });
  ul.appendChild(li);
};

const deleteItems = () => {
  ul.innerHTML = "";
};

const getData = async (text) => {
  try {
    let res = await fetch(
      `https://potterapi-fedeperin.vercel.app/es/characters?search=${text}`
    );
    res = await res.json();
    deleteItems();
    res.slice(0, 6).forEach(displayItems);
  } catch (error) {
    console.log(error);
  }
};

const debounce = (func, ms) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(func, ms, ...args);
  };
};

const suggestions = debounce(getData, 300);

searchBar.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    deleteItems();
    position = null;
  } else if (e.key === "ArrowUp") {
    if (state === "arrowDown") {
      position = position - 2;
      state = "arrowUp";
    } else if (state === "mouseOver") {
      position = position - 1;
      state = "arrowUp";
    } else {
      state = "arrowUp";
    }
    if (position === null || position < 0) {
      position = lists.length - 1;
    }
    for (let i = 0; i < lists.length; i++) {
      if (position === i) {
        lists[i].className = "item";
        position = position - 1;
        searchBar.value = lists[i].textContent;
      } else {
        lists[i].className = "";
      }
    }
  } else if (e.key === "ArrowDown") {
    if (state === "arrowUp") {
      position = position + 2;
      state = "arrowDown";
    } else if (state === "mouseOver") {
      position = position + 1;
      state = "arrowDown";
    } else {
      state = "arrowDown";
    }
    if (position === null || position === lists.length) {
      position = 0;
    }
    for (let i = lists.length - 1; i >= 0; i--) {
      if (position === i) {
        lists[i].className = "item";
        position = position + 1;
        searchBar.value = lists[i].textContent;
      } else {
        lists[i].className = "";
      }
    }
  } else {
    suggestions(e.target.value);
  }
});
