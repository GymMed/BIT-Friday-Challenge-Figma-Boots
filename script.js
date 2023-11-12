const CAROUSEL_STATE_ENUM = {
    RUNNING: 0,
    STOPPED: 1,
};

let carouselState = CAROUSEL_STATE_ENUM.STOPPED;

let dotsWrapperDom = document.querySelector(".dots-wrapper");
let carouselsDoms = document.querySelectorAll(".carousel");
let slidesDoms = carouselsDoms[0].querySelectorAll(".carousel__section");

let activeSlide = 0;
let totalSlides = slidesDoms.length;

let shopButton = document.querySelector(".texts-button-wrapper__button");
let carouselLeft = document.querySelectorAll(".buttons__previous")[0];
let carouselRight = document.querySelectorAll(".buttons__next")[0];

let carouselLeftSvg = carouselLeft.querySelectorAll(
    ".buttons__previous__svg-path"
)[0];
let carouselRightSvg = carouselRight.querySelectorAll(
    ".buttons__next__svg-path"
)[0];

let timeoutId = null;

createDots();
let dotDoms = document.querySelectorAll(".dot-container");

switchCarouselState(CAROUSEL_STATE_ENUM.RUNNING);
initializeCarouselButtons();

function showSlides() {
    activateSlide(activeSlide);
    activateDot(activeSlide);
    fixSlidesIndex();
    timeoutId = setTimeout(showSlides, 5000);
}

function activateSlide(slideIndex) {
    for (let currentSlide = 0; currentSlide < totalSlides; currentSlide++) {
        slidesDoms[currentSlide].style.display = "none";
    }

    slidesDoms[slideIndex].style.display = "flex";
}

function activateDot(slideIndex) {
    for (let currentSlide = 0; currentSlide < totalSlides; currentSlide++) {
        dotDoms[currentSlide].className = dotDoms[
            currentSlide
        ].className.replace(" active", "");
    }

    dotDoms[slideIndex].className += " active";
}

function fixSlidesIndex() {
    if (activeSlide == totalSlides - 1) {
        activeSlide = 0;
        carouselRightSvg.classList.add("disabled");
        carouselLeftSvg.classList.remove("disabled");
    } else if (activeSlide == 0) {
        carouselLeftSvg.classList.add("disabled");
        carouselRightSvg.classList.remove("disabled");
        activeSlide++;
    } else {
        carouselLeftSvg.classList.remove("disabled");
        carouselRightSvg.classList.remove("disabled");
        activeSlide++;
    }
}

function initializeCarouselButtons() {
    carouselLeft.addEventListener("click", function () {
        if (activeSlide == 1) return;
        clearTimeout(timeoutId);
        console.log("impoprtant", activeSlide);
        //because show slides moves to left (index increases)
        //1 becomes 0
        //0 becomes last element
        //and -2 because afterwards it will add 1 immidiatly
        if (activeSlide == 0) {
            activeSlide = totalSlides - 2;
        } else {
            activeSlide -= 2;
        }
        showSlides();
    });

    carouselRight.addEventListener("click", function () {
        if (activeSlide == 0) return;
        clearTimeout(timeoutId);
        showSlides();
    });

    shopButtonInit();
    DotsInit();
}

function DotsInit() {
    if (!dotDoms) return;

    dotDoms.forEach((element, index) => {
        element.addEventListener("click", function () {
            activeSlide = index;
            clearTimeout(timeoutId);
            showSlides();
        });
    });
}

function shopButtonInit() {
    if (!shopButton) return;

    shopButton.addEventListener("click", function () {
        if (!confirm("Switch carousel state to " + (carouselState + 1))) return;
        switchCarouselState(CAROUSEL_STATE_ENUM.STOPPED);
    });
}

function createDots() {
    if (!dotsWrapperDom) {
        return;
    }

    for (let currentDot = 0; currentDot < totalSlides; currentDot++) {
        let dotContainer = document.createElement("div");
        dotContainer.classList.add("dot-container");

        let dot = document.createElement("div");
        dot.classList.add("dot");

        dotContainer.appendChild(dot);
        dotsWrapperDom.appendChild(dotContainer);
    }
}

function switchCarouselState(state) {
    switch (state) {
        case CAROUSEL_STATE_ENUM.RUNNING:
            showSlides();
            break;
        case CAROUSEL_STATE_ENUM.STOPPED:
            clearTimeout(timeoutId);
            break;
        default:
            clearTimeout(timeoutId);
            break;
    }

    carouselState = state;
}
