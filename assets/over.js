const languageButtons = [...document.querySelectorAll('[data-language]')];
const carousel = document.querySelector('[data-carousel]');
const portraits = [...carousel.querySelectorAll('.portrait')];
const portraitImages = portraits.map(portrait => portrait.querySelector('img'));
const storyButtons = portraits.map(portrait => portrait.querySelector('.portrait-image'));
const storyDialog = document.querySelector('#team-story');
const storyPanel = storyDialog.querySelector('.story-panel');
const storyImage = storyDialog.querySelector('.story-photo img');
const storyName = storyDialog.querySelector('#team-story-name');
const storyRole = storyDialog.querySelector('[data-story-role]');
const storyBody = storyDialog.querySelector('[data-story-body]');
const storyPlaceholder = document.querySelector('#team-story-placeholder');
const peeks = carousel.querySelector('.portrait-peeks');
const peekImages = [...peeks.querySelectorAll('img')];
const choices = [...carousel.querySelectorAll('.portrait-picker button')];
const count = carousel.querySelector('[data-count]');
const announcement = carousel.querySelector('[data-announcement]');
let active = 0;
let swiped = false;

storyButtons.forEach((button, index) => {
  button.disabled = false;
  button.addEventListener('click', event => {
    if (swiped && event.detail > 0) return;
    const portrait = portraits[index];
    const role = portrait.querySelector('.portrait-role');
    const story = portrait.querySelector('.portrait-story') ?? storyPlaceholder;
    storyImage.src = portraitImages[index].src;
    storyName.textContent = portrait.querySelector('h3').textContent;
    storyRole.replaceChildren(...(role ? role.cloneNode(true).childNodes : []));
    storyRole.hidden = !role;
    storyBody.replaceChildren(story.content.cloneNode(true));
    storyDialog.showModal();
    storyPanel.scrollTop = 0;
  });
});

storyDialog.querySelector('.story-close').addEventListener('click', () => storyDialog.close());
storyDialog.addEventListener('click', event => {
  if (event.target === storyDialog) storyDialog.close();
});

function selectPortrait(index, announce = true) {
  active = (index + portraits.length) % portraits.length;
  portraits.forEach((portrait, position) => {
    portrait.hidden = position !== active;
    choices[position].setAttribute('aria-pressed', position === active);
  });
  [-1, 1].forEach((step, position) => {
    const neighbor = (active + step + portraits.length) % portraits.length;
    peekImages[position].src = portraitImages[neighbor].src;
  });
  count.textContent = String(active + 1).padStart(2, '0');
  if (announce) {
    const name = portraits[active].querySelector('h3').textContent;
    announcement.textContent = document.documentElement.lang === 'uk'
      ? `Портрет ${active + 1} із ${portraits.length}: ${name}`
      : `Portret ${active + 1} van ${portraits.length}: ${name}`;
  }
}

function setLanguage(language) {
  document.documentElement.lang = language;
  languageButtons.forEach(button => {
    button.setAttribute('aria-pressed', button.dataset.language === language);
  });
}

try {
  if (localStorage.getItem('vitalnya-language') === 'uk') setLanguage('uk');
} catch {
  // The page also works when browser storage is unavailable.
}

languageButtons.forEach(button => {
  button.addEventListener('click', () => {
    const language = button.dataset.language;
    setLanguage(language);
    try {
      localStorage.setItem('vitalnya-language', language);
    } catch {
      // Keep the selected language for this page.
    }
  });
});

selectPortrait(0, false);
carousel.classList.add('is-active');
peeks.hidden = false;
carousel.querySelector('.carousel-controls').hidden = false;
carousel.querySelector('.portrait-picker').hidden = false;

choices.forEach((button, index) => {
  button.addEventListener('click', () => selectPortrait(index));
});

carousel.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => selectPortrait(active + Number(button.dataset.step)));
});

carousel.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

  event.preventDefault();
  selectPortrait(active + (event.key === 'ArrowRight' ? 1 : -1));
  if (choices.includes(event.target)) choices[active].focus();
  if (storyButtons.includes(event.target)) storyButtons[active].focus();
});

let touchStart;
carousel.addEventListener('pointerdown', event => {
  swiped = false;
  if (event.pointerType !== 'touch' || !event.isPrimary || !event.target.closest('.portrait-image')) return;
  touchStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
});

carousel.addEventListener('pointerup', event => {
  if (event.pointerId !== touchStart?.id) return;
  const dx = event.clientX - touchStart.x;
  const dy = event.clientY - touchStart.y;
  touchStart = undefined;
  if (Math.abs(dx) > 45 && Math.abs(dx) > 1.5 * Math.abs(dy)) {
    swiped = true;
    selectPortrait(active + (dx < 0 ? 1 : -1));
  }
});

carousel.addEventListener('pointercancel', event => {
  if (event.pointerId === touchStart?.id) touchStart = undefined;
});
