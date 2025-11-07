// JavaScript code for the Fusionice Games website slider functionality

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const nextButton = document.querySelector(".next");
    const prevButton = document.querySelector(".prev");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? "block" : "none";
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    showSlide(currentSlide);
});

let currentGameId = 'bus-game';

function showGame(gameId) {
  // Tab'ları güncelle
  const tabs = document.querySelectorAll('.game-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');

  // Oyun slider'larını güncelle
  const sliders = document.querySelectorAll('.game-slider');
  sliders.forEach(slider => slider.classList.remove('active'));
  
  const selectedSlider = document.getElementById(gameId);
  selectedSlider.classList.add('active');
  
  currentGameId = gameId;
  currentSlide = 0;
  updateSlides();
  createDots();
}

function changeSlide(direction) {
  const activeSlider = document.querySelector('.game-slider.active');
  const slides = activeSlider.querySelectorAll('.slide');
  
  slides[currentSlide].classList.remove('active');
  
  currentSlide += direction;
  
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  
  updateSlides();
}

function updateSlides() {
  const activeSlider = document.querySelector('.game-slider.active');
  const slides = activeSlider.querySelectorAll('.slide');
  const dots = activeSlider.querySelectorAll('.dot');
  
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentSlide) {
      slide.classList.add('active');
    }
  });
  
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentSlide) {
      dot.classList.add('active');
    }
  });
}

function createDots() {
  const activeSlider = document.querySelector('.game-slider.active');
  const slides = activeSlider.querySelectorAll('.slide');
  const dotsContainer = activeSlider.querySelector('.slider-dots');
  
  dotsContainer.innerHTML = '';
  
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.onclick = () => {
      currentSlide = index;
      updateSlides();
    };
    dotsContainer.appendChild(dot);
  });
}

// Sayfa yüklendiğinde dot'ları oluştur
window.onload = () => {
  createDots();
};

// Otomatik slider (isteğe bağlı)
setInterval(() => {
  changeSlide(1);
}, 5000);