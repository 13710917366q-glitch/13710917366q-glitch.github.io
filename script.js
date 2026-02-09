document.addEventListener('DOMContentLoaded', () => {

  // -------- Navigation smooth scroll --------
  document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // -------- Disable drag --------
  document.querySelectorAll('img, video').forEach(el => {
    el.setAttribute('draggable', 'false');
  });

  // -------- Showreel: click to load bilibili iframe --------
  const showreel = document.querySelector('.showreel-video');
  if (showreel) {
    showreel.addEventListener('click', () => {
      if (showreel.dataset.loaded) return;

      const iframe = document.createElement('iframe');
      // On some mobile browsers, autoplay inside iframe may be blocked.
      // We still request autoplay, but allow attributes to maximize compatibility.
      iframe.src = 'https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&page=1&autoplay=1';
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.frameBorder = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';

      showreel.innerHTML = '';
      showreel.appendChild(iframe);
      showreel.dataset.loaded = 'true';
    });
  }

  // -------- Project modal video --------
  const modal = document.getElementById('videoModal');
  const modalContent = document.getElementById('modalContent');

  // Prevent taps inside the video area from closing the modal (mobile-friendly)
  if (modalContent) {
    modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    modalContent.addEventListener('touchstart', (e) => {
      e.stopPropagation();
    }, { passive: true });
  }

  document.querySelectorAll('.work-card, .project-card').forEach(card => {
    card.addEventListener('click', () => {
      if (!modal || !modalContent) return;

      const bvid = card.dataset.bvid;
      const page = card.dataset.page || '1';
      if (!bvid) return;

      modal.style.display = 'block';

      const iframe = document.createElement('iframe');
      // Mobile browsers often block autoplay; use autoplay=0 to avoid "endless loading" perception.
      iframe.src = `https://player.bilibili.com/player.html?bvid=${bvid}&page=${page}&autoplay=0`;
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.frameBorder = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';

      modalContent.innerHTML = '';
      modalContent.appendChild(iframe);
    });
  });

  // Close modal when tapping outside the video
  if (modal) {
    modal.addEventListener('click', () => {
      modal.style.display = 'none';
      if (modalContent) modalContent.innerHTML = '';
    });
  }

});
