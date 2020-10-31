import anime from 'animejs/lib/anime.es';

const wave = () => {
  anime({
    targets: ['.js-wave', '.js-circle'],
    scale: [1, 1.1],
    skew: ['5deg', '0deg'],
    direction: 'alternate',
    loop: true,
    duration: 6000,
    easing: 'linear',
  });
};

let titleInView = false;

const title = () => {
  const titleEl = document.querySelector('.js-title');
  // const gradientEl = document.querySelector('.menu-gradient');

  const checkScroll = () => {
    titleEl.style.transform = `translateY(-${window.scrollY}px)`;
  };
  const onViewport = () => {
    window.addEventListener('scroll', checkScroll);
    // gradientEl.classList.remove('opacity-0');
  };
  // eslint-disable-next-line no-unused-vars
  const outViewport = () => {
    window.removeEventListener('scroll', checkScroll);
    // gradientEl.classList.add('opacity-0');
  };

  const createObserver = new IntersectionObserver(
    // eslint-disable-next-line no-unused-vars
    (el, observer) => {
      /**
       * This is the callback function of the IntersectionObserver
       * @param el DOM element to observe
       * @param observer instance of IntersectionObserver
       */
      if (el[0].intersectionRatio > 0) {
        titleInView = !titleInView;
        if (titleInView) {
          onViewport();
        }
        // else {
        //   outViewport();
        // }
        // observer.disconnect(); // remove the observer once el has shown
      }
    },
    // we want to fire if el has shown completely
    { threshold: 0 },
  );

  createObserver.observe(titleEl, titleInView);
};

export { wave, title };
