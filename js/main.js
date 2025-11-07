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
    
    // ÖNCE: Aktif olmayan slaytlardaki videoları durdur (Performans)
    if (slide.classList.contains('active') && index !== currentSlide) {
      const oldVideo = slide.querySelector('video');
      if (oldVideo) {
        oldVideo.pause();
      }
    }

    // SONRA: Yeni slaytı aktif et ve medyayı yükle
    if (index === currentSlide) {
      slide.classList.add('active');
      
      // --- YENİ TEMBEL YÜKLEME KODU ---
      // Bu slayt aktif olduğunda, içindeki medyayı yükle
      
      // 1. GÖRSELLERİ (IMG) YÜKLE
      // 'data-src' etiketine sahip bir <img> etiketi ara
      const image = slide.querySelector('img[data-src]');
      if (image) {
        image.src = image.dataset.src; // data-src'yi alıp gerçek src'ye ata
        image.removeAttribute('data-src'); // İşi bittiği için bu etiketi kaldır
      }
      
      // 2. VİDEOLARI (SOURCE) YÜKLE
      // 'data-src' etiketine sahip bir <source> etiketi ara
      const source = slide.querySelector('source[data-src]');
      if (source) {
        const video = slide.querySelector('video');
        source.src = source.dataset.src; // data-src'yi alıp gerçek src'ye ata
        source.removeAttribute('data-src'); // İşi bittiği için kaldır
        video.load(); // Videonun yeni kaynağı okumasını sağla
        
        // Autoplay'i manuel tetikle (bazı tarayıcılar için gerekli)
        var playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay engellendi (genellikle sese izin verilmediği için)
                // Video 'muted' olduğu için bu sorun olmamalı, ama garanti olsun.
            });
        }
      }
      // --- / TEMBEL YÜKLEME KODU ---

    } else {
      slide.classList.remove('active');
    }
  });
  
  // Dot'ları (noktaları) güncelle
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