document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function() {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('open');
  });

  // Smooth Scroll for Anchor Links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });

  // Carrusel de Servicios (sin auto-rotación)
  const carouselInner = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;
  let currentIndex = 0;

  function showItem(index) {
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextItem() {
    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
  }

  function prevItem() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(currentIndex);
  }

  const btnNext = document.querySelector('.carousel-next');
  const btnPrev = document.querySelector('.carousel-prev');

  if (btnNext && btnPrev) {
    // Sin auto-rotación, solo cambian al hacer clic
    btnNext.addEventListener('click', nextItem);
    btnPrev.addEventListener('click', prevItem);
  }

  // Intersection Observer para animaciones fade-in y slide-in
  const faders = document.querySelectorAll('.fade-in');
  const sliders = document.querySelectorAll('.content-grid .text, .service-content');
  sliders.forEach(el => el.classList.add('slide-in'));

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));
  sliders.forEach(slider => appearOnScroll.observe(slider));

  // Simulated Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('¡Gracias por contactarnos! Nos comunicaremos a la brevedad.');
      contactForm.reset();
    });
  }

  // Botón "Back to Top"
  const backToTopBtn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Efectos extra en el Hero
  const heroBtn = document.querySelector('.hero-content .btn');
  if (heroBtn) {
    heroBtn.classList.add('btn-pulse');
  }
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) {
    heroTitle.classList.add('float-anim');
  }
});
