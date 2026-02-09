
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
    el.setAttribute('draggable', false);
  });

  // -------- Showreel click to load video --------
  const showreel = document.querySelector('.showreel-video');

  if(showreel){
    showreel.addEventListener('click', () => {

      if(showreel.dataset.loaded) return;

      const iframe = document.createElement('iframe');
      iframe.src = "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=1";
      iframe.loading = "lazy";
      iframe.allowFullscreen = true;
      iframe.frameBorder = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";

      showreel.innerHTML = '';
      showreel.appendChild(iframe);

      showreel.dataset.loaded = true;
    });
  }


  // -------- Project modal video lazy loading --------
  const modal = document.getElementById('videoModal');
  const modalContent = document.getElementById('modalContent');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {

      const bvid = card.dataset.bvid;
      if(!bvid) return;

      modal.style.display = 'block';

      const iframe = document.createElement('iframe');
      iframe.src = `https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=1`;
      iframe.loading = "lazy";
      iframe.allowFullscreen = true;
      iframe.frameBorder = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";

      modalContent.innerHTML = '';
      modalContent.appendChild(iframe);
    });
  });

  // -------- Close modal --------
  if(modal){
    modal.addEventListener('click', () => {
      modal.style.display = 'none';
      modalContent.innerHTML = '';
    });
  }

});
