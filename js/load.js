import { windowHeight, scrollBackTop, fixedNav } from "./navigations.js";

const sections = document.querySelectorAll("section");

function scrollReveal() {
  for (let section of sections) {
    const boundTop = section.getBoundingClientRect().top;
    if (boundTop < windowHeight - 200) {
      const container = section.querySelector(".container");
      container.classList.add("reveal");
    }
  }
  fixedNav();
  scrollBackTop();
}

export default () => {
  document.addEventListener("scroll", scrollReveal);
  // menuHamburger;
};
