const menu = document.getElementById('menu');
const year = document.getElementById('year');
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

function updateMenu() {
  if (!menu) {
    return;
  }

  if (window.scrollY > 30) {
    menu.classList.add('visible');
  } else {
    menu.classList.remove('visible');
  }
}

window.addEventListener('scroll', updateMenu, { passive: true });
updateMenu();

if (year) {
  year.textContent = new Date().getFullYear();
}

function openLightbox(sourceImage) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = sourceImage.src;
  lightboxImage.alt = sourceImage.alt;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  document.body.classList.remove('no-scroll');
}

galleryImages.forEach((image) => {
  image.tabIndex = 0;
  image.addEventListener('click', () => openLightbox(image));
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) {
    closeLightbox();
  }
});
