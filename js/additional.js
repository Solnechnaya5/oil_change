//Counter figures
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 200;
  
    const runCounter = (counter) => {
      const target = +counter.getAttribute("data-count");
      let count = +counter.innerText;
      const increment = target / speed;
  
      const interval = setInterval(() => {
        if (count < target) {
          count += increment;
          counter.innerText = Math.min(Math.ceil(count), target);
        } else {
          counter.innerText = target;
          clearInterval(interval);
        }
      }, 10);
    };
  
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            runCounter(counter);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((counter) => observer.observe(counter));
  });
//   sliders
const usefullInfoSwiper = new Swiper(".usefull-info-slider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
 delay: 5000,
},
  });

  const testimonialsSwiper = new Swiper(".testimonials-slider", {
    slidesPerView: 2,
  spaceBetween: 40,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
 delay: 5000,
},
  });
  const teamSwiper = new Swiper(".our-team-slider", {
    slidesPerView: 2,
  spaceBetween: 40,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
 delay: 5000,
},
  });