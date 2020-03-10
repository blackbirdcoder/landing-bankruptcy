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
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
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
  // slider-step
  var swiperStep = new Swiper("#swiperContainerSliderStep", {
    cssMode: true,
    loop: false,
    slideClass: "swiper-slide.slider-step__slide",
    navigation: {
      nextEl: ".slider-step-button-next",
      prevEl: ".slider-step-button-prev"
    },
    pagination: {
      el: ".slider-step__pagination",
      clickable: true
    },
    mousewheel: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    on: {
      slideChange: function() {
        infographicsActive();
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
      cssClassReplace(sectionHeroContent, "js-arrow-down_off", "js-arrow-down");
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
      cssClassReplace(sectionHeroContent, "js-arrow-down_off", "js-arrow-down");
      window.removeEventListener("resize", arrowDownResize);
    }
  };
  window.addEventListener("resize", arrowDownResize);

  //Modal window
  let boxButton = document.querySelector(".modal__box-button");
  let input = document.querySelector(".form-feedback__field");
  let closedModal = () => {
    setTimeout(function() {
      modalWindow.classList.remove("js-modal-open");
    }, 400);
    modalWindow.classList.add("js-modal-closed");
  };
  clearListeners = () => {
    window.removeEventListener("keydown", escapeClosedModal);
    input.removeEventListener("focus", hideButtonClosed);
  };
  let escapeClosedModal = event => {
    let keyboardKey = event.code;
    if (keyboardKey === "Escape") {
      closedModal();
      clearListeners();
    }
  };
  let hideButtonClosed = () => {
    let exitStatus = false;
    boxButton.classList.add("js-button-hide");
    showButtonClosed = () => {
      boxButton.classList.remove("js-button-hide");
      exitStatus = true;
      if (exitStatus) {
        input.removeEventListener("blur", showButtonClosed);
      }
    };
    input.addEventListener("blur", showButtonClosed);
  };
  if (modalWindow.classList.contains("modal")) {
    modalWindow.classList.add("js-modal-closed");
  }
  btnOpenModal.onclick = () => {
    if (
      modalWindow.classList.contains("js-modal-closed") &&
      modalWindow.classList.contains("modal")
    ) {
      cssClassReplace(modalWindow, "js-modal-open", "js-modal-closed");
      input.addEventListener("focus", hideButtonClosed);
      window.addEventListener("keydown", escapeClosedModal);
    }
  };
  btnCloseModal.onclick = () => {
    if (
      modalWindow.classList.contains("js-modal-open") ||
      modalWindow.classList.contains("modal")
    ) {
      closedModal();
      clearListeners();
    }
  };
  // --- infographics card animations ---
  const timeCompletion = 800;
  const timeLeaving = 900;
  let playAnimation = elem => {
    window.removeEventListener("scroll", infographicsInSight);
    for (let i = 1; i < elem.length; i++) {
      setTimeout(() => {
        elem[i].classList.add("js-bg-color-animation");
        setTimeout(() => {
          elem[i].classList.remove("js-bg-color-animation");
        }, timeLeaving);
      }, timeCompletion * i);
    }
  };
  let infographicsInSight = () => {
    let igCard = document.getElementsByClassName("card-infographics");
    if (
      document.documentElement.clientWidth >= 300 &&
      document.documentElement.clientWidth < 960
    ) {
      if (document.scrollingElement.scrollTop > 4600) {
        playAnimation(igCard);
      }
    } else if (
      document.documentElement.clientWidth >= 960 &&
      document.documentElement.clientWidth < 2230
    ) {
      if (document.scrollingElement.scrollTop > 3000) {
        playAnimation(igCard);
      }
    } else if (document.documentElement.clientWidth >= 2230) {
      if (document.scrollingElement.scrollTop > 2700) {
        playAnimation(igCard);
      }
    }
  };
  window.addEventListener("scroll", infographicsInSight);
  // ------------------------------------
  // ----- infographics card active -----
  let igCard = document.getElementsByClassName("card-infographics");
  igCard[0].classList.add("js-bg-color-active");
  function infographicsActive() {
    const ACTIVESLIDE = swiperStep.activeIndex;
    for (let i = 0; i < igCard.length; i++) {
      if (igCard[i].classList.contains("js-bg-color-active")) {
        igCard[i].classList.remove("js-bg-color-active");
      }
    }
    igCard[ACTIVESLIDE].classList.add("js-bg-color-active");
  }
  // ------------------------------------
  // functions assistants
  function cssClassReplace(elem, cssAddClass, cssRemoveClass) {
    elem.classList.add(cssAddClass);
    elem.classList.remove(cssRemoveClass);
  }
  // function addId(elem, nameId) {
  //   for (let i = 0; i < elem.length; i++) {
  //     elem[i].id = `${nameId}-${i + 1}`;
  //   }
  // }
  // function addAttributeNumber(elem, att) {
  //   for (let i = 0; i < elem.length; i++) {
  //     elem[i].setAttribute(att, i + 1);
  //   }
  // }
});
