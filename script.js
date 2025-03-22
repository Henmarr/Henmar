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

  // Smooth Scroll para enlaces de anclaje
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

  // Función para animación "profesional"
  function applyProfessionalAnimation(el) {
    // Ajusta a tu gusto (desplazamiento, escala, etc.)
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.9)';
    el.style.transition = 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.8s ease-out';

    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
    });
  }

  // Intersection Observer para aplicar la animación
  const elementsToAnimate = document.querySelectorAll('.content-to-animate, .carousel-item, .offers-image, .hex-item');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        applyProfessionalAnimation(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });

  // Carrusel de Servicios
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
    btnNext.addEventListener('click', nextItem);
    btnPrev.addEventListener('click', prevItem);
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

  // Efectos extra en el Hero (si lo deseas)
  const heroBtn = document.querySelector('.hero-content .btn');
  if (heroBtn) {
    heroBtn.classList.add('btn-pulse');
  }
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) {
    heroTitle.classList.add('float-anim');
  }
});
