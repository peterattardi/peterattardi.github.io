const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const words = ["coglione", "minchione", "secchione"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let pause = false;
const typeAnimation = async () => {
  if (!pause) {
    if (count === words.length) {
      count = 0;
    }
    currentText = words[count];
    letter = currentText.slice(0, ++index);

    document.querySelector(".presentation  span").textContent = letter;
    if (letter.length == currentText.length) {
      count++;
      index = 0;
      pause = true;
      setTimeout(() => {
        pause = false;
      }, 2000);
    }
  }
};

tl = gsap.timeline({ defaults: { ease: "power2.out" } });
tl.to("body", { css: { overflow: "hidden" } });
tl.to("h1", { y: 0, duration: 0.5, stagger: 1 }, "-=2");

tl.fromTo(
  ".loading-text h1",
  { color: "white" },
  { color: "rgb(256,99,71)", duration: 2, stagger: 1 },
  "-=1.5"
);
tl.to(".loading-slider", { y: "-100%", duration: 2 });
tl.from(".loading-animations", { y: 0, duration: 3.5 }, "-=1.5");
tl.fromTo("header", { opacity: 0 }, { opacity: 1, duration: 3 }, "-=2.5");
tl.to("body", { css: { overflow: "visible" } }, "-=2.5");
tl.add(() => {
  setInterval(typeAnimation, 250);
}, "-=2.5");
