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
 
  breakpoints: {
    // when window width is >= 320px
    1920: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1440: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1360: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1240: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    // when window width is >= 640px
   
    320: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    
  },
});
const team = new Swiper(".our-team-slider", {
  slidesPerView: 2,
  spaceBetween: 40,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // autoplay: {
  //   delay: 5000,
  // },
  breakpoints: {
    // when window width is >= 320px
    1920: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1440: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1360: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1240: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 640px
   
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    
  },
});


// burgermenu
function toggleMenu() {
  const nav = document.getElementById("burger-con");
  nav.style.display = nav.style.display === "block" ? "none" : "block";
}

document.querySelector('#burger-icon').addEventListener('click', () => {
  document.querySelector('.burger-menu').classList.toggle('active')
})