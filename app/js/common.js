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
    let clickInput = false;
    boxButton.classList.add("js-button-hide");
    showButtonClosed = () => {
      boxButton.classList.remove("js-button-hide");
      clickInput = true;
      if (clickInput) {
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
  // functions assistants
  function cssClassReplace(elem, cssAddClass, cssRemoveClass) {
    elem.classList.add(cssAddClass);
    elem.classList.remove(cssRemoveClass);
  }
});
