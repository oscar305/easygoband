const firstWord = document.querySelectorAll('.js-title-first');
const secondWord = document.querySelectorAll('.js-title-second');

const headerAnimation = () => {
  const title = document.querySelector('.js-title');
  if (title !== null) {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const changeTitleFast = idx =>
      sleep(110)
        .then(() => {
          firstWord.forEach(el => el.classList.add('hidden'));
          firstWord[idx].classList.remove('hidden');
        })
        .then(() => {
          sleep(220).then(() => {
            secondWord.forEach(el => el.classList.add('hidden'));
            secondWord[idx].classList.remove('hidden');
          });
        });
    const changeTitleSlow = idx =>
      sleep(2000).then(() => {
        let firstStep;
        let secondStep;
        switch (idx) {
          case 1:
            firstStep = 2;
            secondStep = 0;
            break;
          case 2:
            firstStep = 0;
            secondStep = 1;
            break;
          default:
            firstStep = 1;
            secondStep = 2;
        }
        changeTitleFast(firstStep).then(() => {
          changeTitleFast(secondStep).then(() => {
            changeTitleFast(idx);
          });
        });
      });
    const theLoop = () => {
      changeTitleSlow(1).then(() => {
        changeTitleSlow(2).then(() => {
          changeTitleSlow(0).then(() => {
            theLoop();
          });
        });
      });
    };
    theLoop();
  }
};

export default headerAnimation;
