//mission and vision
document.addEventListener("DOMContentLoaded", function () {
  const fadeInElements = document.querySelectorAll(".fade-inn");
  fadeInElements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transition = "opacity 1s ease-in-out";
  });
  window.addEventListener("scroll", () => {
    fadeInElements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.style.opacity = 1;
      }
    });
  });

  const boxElements = document.querySelectorAll(".box");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );
  boxElements.forEach((el) => observer.observe(el));
});
