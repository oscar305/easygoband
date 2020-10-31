const cardsContainer = document.querySelector('.js-cards-move');
const cardsItem = document.querySelectorAll('.js-cards-item');

const moveBlock = () => {
  const arrayEls = [...document.querySelectorAll('.js-cards-item')];
  arrayEls.slice(0, 3).forEach(el => {
    cardsContainer.insertAdjacentElement('beforeEnd', el);
  });
};

const cardsAnimation = () => {
  const seconds = 6 * 1000;
  const cardTimesToMove = cardsItem.length - 2;
  const theLoop = () => {
    for (let i = 1, p = Promise.resolve(); i <= cardTimesToMove; i += 1) {
      p = p.then(
        () =>
          new Promise(resolve =>
            setTimeout(() => {
              if (i === cardTimesToMove) {
                cardsContainer.classList.remove('transition');
                cardsContainer.classList.remove(`move-${i - 1}`);
                moveBlock();
                theLoop();
              } else {
                cardsContainer.classList.add('transition');
                cardsContainer.classList.add(`move-${i}`);
                cardsContainer.classList.remove(`move-${i - 1}`);
                resolve();
              }
            }, i === 1 ? 0 : seconds),
          ),
      );
    }
  };
  theLoop();
};

export default cardsAnimation;
