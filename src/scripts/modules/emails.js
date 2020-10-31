require('intersection-observer'); // IntersectionObserver polyfill

/* eslint-disable no-param-reassign */
const contacts = [
  'ensn.pbeeny@rnfltbonaq.pbz',
  'enzveb.tbeqvyyb@rnfltbonaq.pbz',
  'qnavry.byviren@rnfltbonaq.pbz',
  'rphnqbe@rnfltbonaq.pbz',
  'une.inaqreirra@rnfltbonaq.pbz',
  'eqbzvavpnan@rnfltbonaq.pbz',
  'pbybzovn@rnfltbonaq.pbz',
];

const emailDecode = str =>
  // eslint-disable-next-line no-return-assign
  str.replace(/[a-zA-Z]/g, char =>
    String.fromCharCode(
      // eslint-disable-next-line no-cond-assign
      (char <= 'Z' ? 90 : 122) >= (char = char.charCodeAt(0) + 13)
        ? char
        : char - 26,
    ),
  );

const onViewport = els => {
  els.forEach((_el, i) => {
    const el = _el;
    const decode = emailDecode(contacts[i]);
    el.textContent = decode;
    el.setAttribute(
      'href',
      `mailto:${decode}?subject=Contacto desde Easygoband.com`,
    );
    el.classList.add('loaded');
  });
};

const createObserver = new IntersectionObserver(
  (el, observer) => {
    /**
     * This is the callback function of the IntersectionObserver
     * @param el DOM element to observe
     * @param observer instance of IntersectionObserver
     */
    if (el[0].intersectionRatio > 0) {
      onViewport(document.querySelectorAll('footer .js-contact'));
      observer.disconnect(); // remove the observer once el has shown
    }
  },
  // we want to fire if el has shown completely
  { threshold: 0.5 },
);

const menuClicked = () => {
  let areEmailsMenuLoaded = false;
  const body = document.querySelector('body');
  const burgerIcon = document.querySelector('.js-menu');
  const burgerContacts = document.querySelectorAll('.burger-menu .js-contact');
  if (burgerIcon) {
    burgerIcon.onclick = () => {
      if (!areEmailsMenuLoaded) {
        areEmailsMenuLoaded = true;
        onViewport(burgerContacts);
      }
      body.classList.add('menu-open');
    };
  }
};

const loadEmails = () => {
  menuClicked();
  createObserver.observe(document.querySelector('footer'));
};

export { loadEmails, emailDecode };
