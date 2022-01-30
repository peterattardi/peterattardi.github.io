const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const words = [
  "software developer",
  "tech enthusiast",
  "human being",
  "a lot of things",
];
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
tl.to(".loading-slider, main, footer", { css: { display: "none" } });
tl.to("h1", { y: 0, duration: 0.5, stagger: 1 }, "-=5");

tl.fromTo(
  ".loading-text h1",
  { color: "white" },
  { color: "rgb(256,99,71)", duration: 0.5, stagger: 1 },
  "-=1.5"
);
tl.to(".loading-slider, main, footer", { css: { display: "flex" } });
tl.to(".loading-slider", { y: "-100%", duration: 1 });
tl.to("body", { css: { overflow: "visible" } });
tl.from(".loading-animations", { y: 0, duration: 3 }, "-=1.5");
tl.fromTo("header", { opacity: 0 }, { opacity: 1, duration: 3 }, "-=2");
tl.to(".loading-animation, .loading-slider, .loading-text", {
  css: { display: "none" },
});

tl.add(() => {
  setInterval(typeAnimation, 175);
}, "-=2.5");

gsap.registerPlugin(ScrollTrigger);

gsap.to(".details__grid", {
  scrollTrigger: ".details__grid",
  opacity: 1,
  duration: 5,
});

gsap.to(".projects__grid", {
  scrollTrigger: ".projects__grid",
  opacity: 1,
  duration: 3,
});

gsap.to(".email", {
  scrollTrigger: ".email",
  opacity: 1,
  duration: 3,
});
