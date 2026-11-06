document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Navigation & Mobile Menu Logic ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('navOverlay');
  const dropdownBtn = document.getElementById('dropdownBtn');

  // Toggle mobile navigation drawer
  function toggleMenu() {
    if (hamburger && navLinks && navOverlay) {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      navOverlay.classList.toggle('active');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', toggleMenu);
  }

  // Mobile dropdown toggle on click
  if (dropdownBtn) {
    const dropdown = dropdownBtn.closest('.dropdown');
    dropdownBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && dropdown) {
        e.preventDefault(); // Prevents navigating to top-destinations.html on mobile touch
        dropdown.classList.toggle('active');
      }
    });
  }

  // --- 2. Trip Cost Estimator Logic ---
  const calcBtn = document.getElementById('calc-btn');
  const travelersInput = document.getElementById('travelers');
  const daysInput = document.getElementById('days');
  const packageSelect = document.getElementById('package');
  const resultDiv = document.getElementById('result');

  function calculateCost() {
    if (!travelersInput || !daysInput || !packageSelect || !resultDiv) return;

    const travelers = parseInt(travelersInput.value) || 0;
    const days = parseInt(daysInput.value) || 0;
    const rate = parseInt(packageSelect.value) || 0;

    if (travelers <= 0 || days <= 0) {
      resultDiv.innerHTML = '<span style="color: #c0392b;">Please enter valid travelers and days.</span>';
      return;
    }

    const totalCost = travelers * days * rate;
    resultDiv.innerHTML = `Total Estimate: <strong>$${totalCost.toLocaleString()}</strong>`;
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', calculateCost);
  }

  // --- 3. Hero Slideshow Script ---
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slide-btn.prev');
  const nextBtn = document.querySelector('.slide-btn.next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    if (slides.length === 0) return;

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 5000); // Transitions every 5 seconds
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  if (slides.length > 0) {
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoplay();
      });
    });

    startAutoplay();
  }
  // Click-and-drag horizontal scrolling for desktop users
const container = document.querySelector('.feed-container');

let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener('mouseleave', () => {
  isDown = false;
});

container.addEventListener('mouseup', () => {
  isDown = false;
});

container.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2; // Adjust scroll speed multiplier
  container.scrollLeft = scrollLeft - walk;
});

// Card click action handler
const cards = document.querySelectorAll('.feed-card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    const username = card.querySelector('.username').innerText;
    console.log(`Story clicked for: ${username}`);
  });
});
});
// Full-Screen Story Modal Functionality
const modal = document.getElementById('storyModal');
const modalClose = document.querySelector('.modal-close');
const modalImage = document.getElementById('modalImage');
const modalAvatar = document.getElementById('modalAvatar');
const modalUsername = document.getElementById('modalUsername');
const modalLocationText = document.getElementById('modalLocationText');

const cards = document.querySelectorAll('.feed-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    // Extract background image URL
    const bgImageStyle = card.style.backgroundImage;
    const avatarSrc = card.querySelector('.badge-avatar').src;
    const username = card.querySelector('.username').innerText;
    const location = card.querySelector('.location-info span').innerText;

    // Populate modal elements
    modalImage.style.backgroundImage = bgImageStyle;
    modalAvatar.src = avatarSrc;
    modalUsername.innerText = username;
    modalLocationText.innerText = location;

    // Show modal
    modal.classList.add('active');
  });
});

// Close modal on clicking the close button
modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Close modal when clicking outside the content box
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});