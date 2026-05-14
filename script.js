document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle - only run if toggle exists
  const toggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  if (toggle) {
    function updateIcon(theme) {
      toggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    html.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);

    toggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateIcon(newTheme);
    });
  }

  // Wave flip - only run if wave image exists
  const waveImg = document.getElementById("ui-wave-img");
  if (waveImg) {
    const waveWrap = waveImg.parentElement;
    let flipInterval;

    function startAutoFlip() {
      flipInterval = setInterval(() => {
        waveWrap.classList.toggle("wave-active");
      }, 3000);
    }

    function stopAutoFlip() {
      clearInterval(flipInterval);
    }

    startAutoFlip();

    waveImg.addEventListener("mouseenter", () => {
      stopAutoFlip();
      waveWrap.classList.add("wave-active");
    });

    waveImg.addEventListener("mouseleave", () => {
      waveWrap.classList.remove("wave-active");
      startAutoFlip();
    });
  }

  // Contact form validation - only run if form exists
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {  // <--- added this check
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      
      document.querySelectorAll('.error').forEach(el => el.textContent = '');
      document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

      const name = document.getElementById('name');
      if (name.value.trim() === '') {
        showError(name, 'Name is required');
        valid = false;
      }

      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === '') {
        showError(email, 'Email is required');
        valid = false;
      } else if (!emailRegex.test(email.value)) {
        showError(email, 'Enter a valid email');
        valid = false;
      }

      const message = document.getElementById('message');
      if (message.value.trim() === '') {
        showError(message, 'Message cannot be empty');
        valid = false;
      }

      if (valid) {
        status.textContent = 'Message sent! I\'ll get back to you soon.';
        status.style.color = 'green';
        form.reset();
      } else {
        status.textContent = '';
      }
    });
  }

  function showError(input, message) {
    input.classList.add('error');
    input.nextElementSibling.textContent = message;
  }

  // Animate skill bars when they come into view
  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll(".skill-progress");
            progressBars.forEach((bar) => {
              const width = bar.getAttribute("data-width");
              bar.style.width = width;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(skillsSection);
  }

  // Project filtering - only run if buttons exist
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }
});