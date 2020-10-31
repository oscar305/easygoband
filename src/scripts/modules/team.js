import anime from 'animejs/lib/anime.es';

// const teamImgs = document.querySelectorAll('.team .js-team-item');
const teamImgs = document.querySelectorAll('.teamccc .js-team-itemccc');
const teamContent = document.querySelectorAll('.team-back .js-team-item');
const teamText = document.querySelectorAll('.team-content');
const settings = {
  content: { duration: 200, easing: 'linear' },
  text: { duration: 700, easing: 'cubicBezier(0.8, 0, 0.2, 1)' },
};
const verticalSlots = [2, 3, 8];

// parseInt 2nd param is the radix
// first element array is 0, then -1
const getPositionHovered = el =>
  parseInt(el.classList[2].split('-')[2], 10) - 1;

const checkIfVertical = idx => verticalSlots.includes(idx);

const team = () => {
  teamImgs.forEach(_el => {
    const el = _el;
    let idxActive = 0;
    const logMouseOver = e => {
      idxActive = getPositionHovered(e.target);
      const elHovered = teamContent[idxActive];
      teamImgs.forEach(imgEls => imgEls.classList.remove('z-10'));
      elHovered.classList.remove('hidden');
      elHovered.classList.add('z-50');
      if (!checkIfVertical(idxActive)) {
        elHovered.style.transformOrigin = 'center left 0';
        anime({
          targets: elHovered,
          duration: settings.content.duration,
          easing: settings.content.easing,
          scaleX: [0, 1],
        });
      } else {
        elHovered.style.transformOrigin = 'top center 0';
        anime({
          targets: elHovered,
          duration: settings.content.duration,
          delay: settings.content.delay,
          easing: settings.content.easing,
          scaleY: [0, 1],
        });
      }
      anime({
        targets: teamText[idxActive],
        duration: settings.text.duration,
        easing: settings.text.easing,
        translateY: ['25%', 0],
        opacity: [0, 1],
      });
    };
    const logMouseOut = () => {
      teamContent[idxActive].classList.add('hidden');
    };
    el.onmouseover = logMouseOver;
    el.onmouseout = logMouseOut;
  });
};

export default team;
