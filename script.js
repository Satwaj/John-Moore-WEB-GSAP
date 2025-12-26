gsap.registerPlugin(ScrollTrigger);

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});

scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

gsap.to("#div-img img", {
  scale: 1,
  ease: "none",
  scrollTrigger: {
    trigger: "#div-img",
    scroller: "#main",
    start: "top bottom",
end: "bottom top",
    scrub: true
  }
});

// Pin the aside on page 3 using #main as scroller
ScrollTrigger.create({
  trigger: "#page3",
  scroller: "#main", // Use the main scroller
  start: "top top",
  end: "bottom top",
  pin: "#aside",
  pinSpacing: false
});

// Refresh ScrollTrigger after setup
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();
// IDs for all buttons (Page 1 top and Page 3 aside)
const buttonToSectionMap = {
  'btn-about': '#right1',      // Page 1 top button
  'btn-works': '#right3',      // Page 1 top button
  'btn-awards': '#right5',    // Page 1 top button
  'btn-expertise': '#right5', // Page 1 top button
  'btn-contact': '#right6',   // Page 1 top button
  'aside-btn-about': '#right1',   // Page 3 aside button
  'aside-btn-works': '#right3',   // Page 3 aside button
  'aside-btn-awards': '#right5', // Page 3 aside button
  'aside-btn-expertise': '#right5', // Page 3 aside button
  'aside-btn-contact': '#right6'   // Page 3 aside button
};

// Add event listeners to all buttons
Object.keys(buttonToSectionMap).forEach(buttonId => {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener('click', () => {
      const sectionId = buttonToSectionMap[buttonId];
      scroll.scrollTo(sectionId);
    });
  }
});

const right6 = document.querySelector("#right6");

scroll.on("scroll", (obj) => {
  const scrollY = obj.scroll.y;
  const limit = right6.offsetTop + right6.offsetHeight - window.innerHeight;

  if (scrollY > limit) {
    scroll.scrollTo(limit);
  }
});
 window.addEventListener("load", () => {
  const main = document.querySelector("#main");
  const right6 = document.querySelector("#right6");

  const endPoint =
    right6.getBoundingClientRect().top +
    right6.offsetHeight +
    window.scrollY;

  main.style.height = endPoint + "px";

  if (scroll) {
    scroll.update(); // locomotive refresh
  }
});

