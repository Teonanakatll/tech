
import { initSmoothScroll, destroySmoothScroll, mobileMenu, scrollOnSlider, anchor } from "./components/utils.js";
import { homePage, projectPage } from "./components/sliders.js";

import barba from "@barba/core";

import { gsap, Power2 } from "gsap";

document.addEventListener("DOMContentLoaded", () => {



  barba.init({
    sync: true,
    cacheIgnore: false,
    transitions: [
      {
        name: "opacity-transition",
        leave(data) {
					destroySmoothScroll(); // Уничтожаем Locomotive Scroll перед сменой страницы
          gsap.to(data.current.container, {
            opacity: 0,
            duration: .8,
            filter: "blur(10px)",
            x: -500,
            ease: "power2.Out"
          });
        },
        enter(data) {
          if (data.next.namespace === "projects") {
            gsap.from(data.next.container, {
              opacity: 0,
              x: 500,
              scale: .95,
              duration: .7,
              ease: "power2.inOut"
            })
          } else if (data.next.namespace === "services") {
            gsap.fromTo(data.next.container, 
              { opacity: 0, scale: .8 },
              { opacity: 1, scale: 1, duration: .8, ease: "bounce.out" }
          )
          } else if (data.next.namespace === "blog") {
            gsap.fromTo(data.next.container,
              {opacity:0, rotate: -180, scale: .7},
              {
                opacity:1,
                rotate: 0,
                scale: 1,
                duration: 1,
                ease: "back.out(1.7)"
              }
            )
          } else if (data.next.namespace === "about") {
            gsap.fromTo(data.next.container, 
              { opacity: 0, scale: .8 },
              { opacity: 1, scale: 1, duration: .8, ease: "elastic.out(1, .75)" }
            )
          } else if (data.next.namespace === "benefits") {
            gsap.from(data.next.container, 
              { opacity: 0, scale: .5, duration: 1.2, ease: "elastic.out(1, .75" }
            )
          } else if (data.next.namespace === "partners") {
            gsap.fromTo(data.next.container, 
              { opacity: 0, rotate: 180},
              {opacity: 1, rotate: 0, duration: 1, ease: "power4.out"}
            )
          } else if (data.next.namespace === "feedback") {
            gsap.from(data.next.container, {
              opacity: 0,
              filter: "blur(10px)",
              duration: 1,
              ease: "power2.out"
            });

          } else {
            gsap.from(data.next.container, {
              opacity: 0,
              duration: .9,
              // scale: 3,
              // rotate: 360,
            });
          }

        },
        afterEnter(data) {

        },
      },
    ],
    prevent: ({ el }) => {
      // Игнорируем переходы для якорных ссылок
      return el.hasAttribute("href") && el.getAttribute("href").startsWith("#");
    },
    views: [
      {
        namespace: "home",
        // beforeEnter() {
        // },
        afterEnter() {
          console.log("afterEnter triggered in 'home'");
          // scrollOnSlider();
          mobileMenu();
          homePage();
          setTimeout(() => initSmoothScroll(), 300); // Инициализация через 300 мс
          anchor();
        },
      },
      {
        namespace: "projects",
        afterEnter() {
					initSmoothScroll();
          // scroll.update(); // Обновление Locomotive Scroll
          mobileMenu();
          anchor();
        },
      },
      {
        namespace: "project",
        afterEnter() {
					initSmoothScroll();
					scrollOnSlider();
          mobileMenu();
          projectPage();
          anchor();
        },
      },
      {
        namespace: "post",
        afterEnter() {
					initSmoothScroll();
          mobileMenu();
          anchor();
        },
      },
      {
        namespace: "services",
        afterEnter() {
					initSmoothScroll();
          mobileMenu();
          anchor();
          gsap.from('.services-content-item', {
            opacity: 0,
            y: 250,
            stagger: .4,
            duration: .6,
            ease: "bounce.out",
            delay: .7
          })
        },
      },
      {
        namespace: "blog",
        afterEnter() {
					initSmoothScroll();
          mobileMenu();
          anchor();
        },
      },
      {
        namespace: "about",
        afterEnter() {
					initSmoothScroll();
          mobileMenu();
          anchor();
        },
      },
      {
        namespace: "benefits",
        afterEnter() {
					initSmoothScroll();
          mobileMenu();
          anchor();
        },
      },
      {
        namespace: "partners",
        afterEnter() {
					initSmoothScroll();
          mobileMenu();
          anchor();
        },
      },
      {
        namespace: "feedback",
        afterEnter() {
					initSmoothScroll();
          mobileMenu();
          anchor();
        },
      },
    ],
  });

});
