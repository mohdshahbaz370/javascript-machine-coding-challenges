const shootButton = document.getElementById("shootButton");

const shoot = () => {
  console.log("firing");
};

// First Method:
// const throttle = (func, ms) => {
//   let previousTime = 0;
//   return () => {
//     const currentTime = new Date().getTime();
//     if (currentTime - previousTime > ms) {
//       func();
//       previousTime = currentTime;
//     } else {
//       console.log("reloading");
//     }
//   };
// };

// Second Method:
const throttle = (func, ms) => {
  let shouldWait = false;
  return () => {
    if (shouldWait) {
      console.log("reloading");
      return;
    }
    func();
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, ms);
  };
};

const ThrottledFunction = throttle(shoot, 2000);

shootButton.addEventListener("click", (event) => {
  ThrottledFunction();
});
