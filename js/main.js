// 1. Sayfa yüklendiğinde TÜM slider'ları bul ve başlat
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.game-slider');
  
  sliders.forEach(slider => {
    initializeSlider(slider);
  });
});

function initializeSlider(slider) {
  const slides = slider.querySelectorAll('.slide');
  const dotsContainer = slider.querySelector('.slider-dots');
  const prevButton = slider.querySelector('.prev');
  const nextButton = slider.querySelector('.next');
  
  // Her slider'a kendi 'mevcut slide' sayacını ekliyoruz
  // 'dataset' kullanarak bunu HTML elemanının hafızasında tutuyoruz
  slider.dataset.currentSlide = 0;

  // İlk 'active' olan slide'ı bul, yoksa ilkini ata
  const activeSlide = slider.querySelector('.slide.active');
  if (activeSlide) {
      // 'active' olanın indeksini bul ve sayacı ona ayarla
      slider.dataset.currentSlide = Array.from(slides).indexOf(activeSlide);
  } else {
      // 'active' yoksa ilk slide'ı 'active' yap
      if (slides.length > 0) {
          slides[0].classList.add('active');
          slider.dataset.currentSlide = 0;
      }
  }

  // Her slider'ın KENDİ butonlarına tıklama olayı ekliyoruz
  prevButton.addEventListener('click', () => {
    changeSlide(slider, -1);
  });
  
  nextButton.addEventListener('click', () => {
    changeSlide(slider, 1);
  });
  
  // Bu slider için dot'ları (noktaları) oluştur
  createDots(slider);
  // Bu slider'ın durumunu güncelle (ilk yükleme için)
  updateSlides(slider);
}

function changeSlide(slider, direction) {
  const slides = slider.querySelectorAll('.slide');
  if (slides.length === 0) return;
  
  // Slider'ın mevcut sayacını al
  let currentSlide = parseInt(slider.dataset.currentSlide);
  
  slides[currentSlide].classList.remove('active');
  
  currentSlide += direction;
  
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  
  // Yeni sayacı slider'ın hafızasına kaydet
  slider.dataset.currentSlide = currentSlide;
  
  updateSlides(slider);
}

function updateSlides(slider) {
  const slides = slider.querySelectorAll('.slide');
  const dots = slider.querySelectorAll('.dot');
  const currentSlide = parseInt(slider.dataset.currentSlide);
  
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function createDots(slider) {
  const slides = slider.querySelectorAll('.slide');
  const dotsContainer = slider.querySelector('.slider-dots');
  const currentSlide = parseInt(slider.dataset.currentSlide);
  
  dotsContainer.innerHTML = ''; // Eski dot'ları temizle
  
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === currentSlide) dot.classList.add('active');
    
    // Dot'a tıklanınca bu slider'ı güncelle
    dot.onclick = () => {
      slider.dataset.currentSlide = index;
      updateSlides(slider);
    };
    dotsContainer.appendChild(dot);
  });
}