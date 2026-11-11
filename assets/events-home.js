(() => {
 const track = document.getElementById('event-slides');
 if (!track) return;
 const cards = [...track.querySelectorAll('.ev-home-card')];
 const controls = document.querySelector('.ev-home-controls');
 const mobile = matchMedia('(max-width:700px)');
 const reduced = matchMedia('(prefers-reduced-motion:reduce)');
 let current = 0;
 function update() {
  const center = track.getBoundingClientRect().left + track.clientWidth / 2;
  const distance = el => Math.abs(el.getBoundingClientRect().left + el.offsetWidth / 2 - center);
  current = cards.reduce((best, card, i) => distance(card) < distance(cards[best]) ? i : best, 0);
  controls.querySelector('b').textContent = String(current + 1).padStart(2, '0');
 }
 function move(step) {
  const target = cards[(current + step + cards.length) % cards.length];
  const offset = target.getBoundingClientRect().left - track.getBoundingClientRect().left - (track.clientWidth - target.offsetWidth) / 2;
  track.scrollTo({left: track.scrollLeft + offset, behavior: reduced.matches ? 'instant' : 'smooth'});
 }
 controls.hidden = false;
 controls.querySelectorAll('button').forEach(button => button.addEventListener('click', () => move(Number(button.dataset.eventStep))));
 track.addEventListener('keydown', event => {
  if (!mobile.matches || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
 });
 let timer;
 track.addEventListener('scroll', () => {clearTimeout(timer); timer = setTimeout(update, 100);}, {passive:true});
 window.addEventListener('resize', update);
 update();
})();
