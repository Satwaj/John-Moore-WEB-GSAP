gsap.registerPlugin(ScrollTrigger);

let scroll; // Declare scroll variable globally

try {
  scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
} catch (error) {
  console.error("Error initializing Locomotive Scroll:", error);
  // Fallback to normal scrolling if Locomotive fails
  document.body.style.overflow = "auto";
}

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

if (scroll) {
  gsap.to("#div-img img", {
    scale: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top top",
      end: "bottom bottom",
      scrub: 5
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
}
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
  if (button && scroll) {
    button.addEventListener('click', () => {
      const sectionId = buttonToSectionMap[buttonId];
      scroll.scrollTo(sectionId);
    });
  }
});

// Remove the scroll limit logic that causes infinite scrolling
// const right6 = document.querySelector("#right6");

// scroll.on("scroll", (obj) => {
//   const scrollY = obj.scroll.y;
//   const limit = right6.offsetTop + right6.offsetHeight - window.innerHeight;

//   if (scrollY > limit) {
//     scroll.scrollTo(limit);
//   }
// });
window.addEventListener("load", () => {
  // Delay execution to ensure DOM is fully ready
  setTimeout(() => {
    const main = document.querySelector("#main");
    const right6 = document.querySelector("#right6");

    if (main && right6) {
      // Calculate total height of all content
      const totalHeight = document.body.scrollHeight;
      main.style.height = totalHeight + "px";

      if (scroll) {
        scroll.update(); // locomotive refresh
        ScrollTrigger.refresh(); // Also refresh ScrollTrigger
      }
    }
  }, 200); // Increased delay
});

// Add resize handler for responsiveness
window.addEventListener("resize", () => {
  if (scroll) {
    scroll.update();
    ScrollTrigger.refresh();
  }
});

