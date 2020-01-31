// start animation as you scroll
new WOW().init();

//loaded site
document.addEventListener("DOMContentLoaded", () => {
  //--sliders--
  // slider-hero
  let swiperHero = new Swiper("#swiperContainerSliderHero", {
    cssMode: true,
    navigation: {
      nextEl: ".slider-hero-button-next",
      prevEl: ".slider-hero-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    mousewheel: true,
    keyboard: true,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false
    },
    on: {
      init: function() {
        let controlPanelSliderHero = document.querySelector(
          ".slider-hero__control-panel"
        );
        controlPanelSliderHero.addEventListener("mouseenter", () => {
          swiperHero.autoplay.stop();
        });
        swiperContainerSliderHero.addEventListener("mouseenter", () => {
          swiperHero.autoplay.stop();
        });
        this.el.addEventListener("mouseleave", () => {
          this.autoplay.start();
        });
      }
    }
  });
  //-----------

  // Scroll
  // arrow down
  let sectionHeroContent = document.querySelector(
    ".section-hero__content-bottom"
  );
  let arrowDownScroll = () => {
    if (
      document.scrollingElement.scrollTop > 10 &&
      sectionHeroContent.classList.contains("js-arrow-down")
    ) {
      cssClassReplace("js-arrow-down_off", "js-arrow-down");
      window.removeEventListener("scroll", arrowDownScroll);
    }
  };
  window.addEventListener("scroll", arrowDownScroll);

  // Resize
  // arrow down
  let arrowDownResize = () => {
    if (
      document.documentElement.clientWidth >= 640 &&
      sectionHeroContent.classList.contains("js-arrow-down")
    ) {
      cssClassReplace("js-arrow-down_off", "js-arrow-down");
      window.removeEventListener("resize", arrowDownResize);
    }
  };
  window.addEventListener("resize", arrowDownResize);

  // functions assistants
  function cssClassReplace(cssAddClass, cssRemoveClass) {
    sectionHeroContent.classList.add(cssAddClass);
    sectionHeroContent.classList.remove(cssRemoveClass);
  }
});
