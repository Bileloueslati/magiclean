import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Headroom from "headroom.js";


// swiper

document.querySelectorAll<HTMLElement>('.swiper').forEach((el) => {
        new Swiper(el, {
        modules: [Pagination, Navigation],
        autoplay: {
            delay: 500,
            disableOnInteraction: true
        },
        speed: 500,
        breakpoints: JSON.parse(el.dataset.breakpoints || ''),
        slideToClickedSlide: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
  }
      });
});

// AOS Animation

AOS.init({
  duration: 1500,
  anchorPlacement: 'top-center',
  once: true
});

// scroll animation

document.querySelectorAll('a').forEach((el) => {

  const anchor = el.getAttribute('href');

  if(anchor?.startsWith("#")) {

  el.addEventListener("click", (link) => {

      link.preventDefault();

     if(el.classList.contains("active")) {

       return;
  }

      const section = document.getElementById(anchor.replace("#", ''));

      if(section) {

        const offsetTop = section.offsetTop;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        })
      }
  })
  }
})


// Sticky Header

new Headroom(document.querySelector("header")!).init();

// Active section on anchor

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

     const {isIntersecting, target, intersectionRatio} = entry;

     const id = target.getAttribute("id");

     if(isIntersecting && intersectionRatio >= 0.55) {

        document.querySelector(".active")?.classList.remove("active");

        document.querySelector(`[href="#${id}"]`)?.classList.add("active");
     }
      

  })
  
}, {threshold: 0.55});

document.querySelectorAll("section").forEach((section) => {

  observer.observe(section);
});