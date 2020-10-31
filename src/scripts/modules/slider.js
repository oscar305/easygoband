const sliderAnimation = () => {
  document.querySelectorAll('.js-slide').forEach(slide => {
    // eslint-disable-next-line func-names
    slide.addEventListener('mousemove', function(e) {
      // Get dimensions of slide element
      const r = this.getBoundingClientRect();

      // Set x and y values prop values based on center of slide element
      this.style.setProperty(
        '--x',
        e.clientX - (r.left + Math.floor(r.width / 2)),
      );
      this.style.setProperty(
        '--y',
        e.clientY - (r.top + Math.floor(r.height / 2)),
      );
    });

    // eslint-disable-next-line func-names
    slide.addEventListener('mouseleave', function() {
      // Reset x and y prop values when no longer hovering
      this.style.setProperty('--x', 0);
      this.style.setProperty('--y', 0);
    });

    const resetEl = _el => {
      const el = _el;
      el.style.left = 0;
      el.classList.remove('is-active');
      el.previousElementSibling.style.left = `${(100 / 3) * 2}%`;
      document
        .querySelector('.slider-container')
        .appendChild(el.previousElementSibling);
    };

    // eslint-disable-next-line func-names
    slide.addEventListener('click', function() {
      const prevElActive = document.querySelector('.js-slide.is-active');
      if (this !== prevElActive) {
        resetEl(prevElActive);
        this.classList.add('is-active');
        this.style.left = '50%';
      }
    });
  });
};

export default sliderAnimation;
