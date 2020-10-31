const simpleActions = () => {
  // Video play
  const videoBtn = document.querySelector('.js-video');
  if (videoBtn !== null) {
    videoBtn.onclick = () => {
      videoBtn.remove();
    };
  }
  const slide =
    document.querySelector('.js-slide') ||
    document.querySelector('.js-sol-video');
  if (slide !== null) {
    const slideVideoBtn = slide.querySelector('button');
    slideVideoBtn.onclick = () => {
      const videoEl = slide.querySelector('.video-iframe');
      videoEl.setAttribute('src', videoEl.dataset.src);
      videoEl.classList.remove('is-hidden');
      slideVideoBtn.remove();
      const videoContainer =
        slide.querySelector('.slide__content') ||
        slide.querySelector('.js-sol-video-container');
      if (videoContainer !== null) {
        videoContainer.remove();
      }
    };
  }
  const videoBtns = document.querySelectorAll('.js-support-video');
  if (videoBtns.length > 0) {
    videoBtns.forEach(_btn => {
      const btn = _btn;
      btn.onclick = () => {
        const videoMain = document.querySelector('.video-iframe');
        videoMain.setAttribute('src', btn.dataset.video);
      };
    });
  }

  // Menu close
  const body = document.querySelector('body');
  const closeMenu = _trigger => {
    const trigger = _trigger;
    trigger.onclick = () => {
      body.classList.remove('menu-open');
    };
  };
  const closeIcon = document.querySelector('.js-menu-close');
  const formNav = document.querySelector('.js-close-nav');
  if (closeIcon) {
    closeMenu(closeIcon);
  }
  if (formNav) {
    closeMenu(formNav);
  }
  // Scroll to element
  const scrollIt = el => {
    // Not fully supported https://caniuse.com/#feat=css-scroll-behavior
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: el.offsetTop + 50,
    });
  };
  const scrollBtns = document.querySelectorAll('[class*="scrollto"]');
  if (scrollBtns.length > 0) {
    scrollBtns.forEach(_btn => {
      const btn = _btn;
      const elClassName = btn.className
        .split(' ')
        .find(className => className.includes('scrollto'))
        .split('-')[1];
      btn.onclick = () => {
        scrollIt(document.querySelector(`.${elClassName}`));
      };
    });
  }

  const clients = document.querySelector('.js-clients');
  const clientsBase = document.querySelector('.js-clients-item');
  // eslint-disable-next-line no-undef
  const clientsImages = typeof App !== 'undefined' ? App.clients : [];
  let clientsItems;
  let groups = [];
  let groupActive = 0;

  const breakArrayIntoGroups = (data, maxPerGroup) => {
    for (let index = 0; index < data.length; index += maxPerGroup) {
      groups.push(data.slice(index, index + maxPerGroup));
    }
    return groups;
  };

  const logicCardsAnimation = () => {
    clientsItems.forEach(el => {
      if (groups[groupActive].includes(el)) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
    groupActive += groupActive + 1 > groups.length - 1 ? -groupActive : 1;
  };

  const cardsAnimation = () => {
    setTimeout(() => {
      logicCardsAnimation();
      cardsAnimation();
    }, 3000);
  };

  if (clients !== null) {
    clientsImages.forEach((img, idx) => {
      const item = clientsBase.cloneNode(true);
      item.dataset.id = idx;
      item.querySelector('img').setAttribute('src', img);
      item.classList.add('hidden');
      clients.appendChild(item);
    });
    clientsBase.remove();
    clientsItems = Array.from(document.querySelectorAll('.js-clients-item'));
    groups = breakArrayIntoGroups(clientsItems, 7);
    logicCardsAnimation();
    cardsAnimation();
  }

  const contactFormTriggers = document.querySelectorAll('.js-form-trigger');
  if (contactFormTriggers.length > 0) {
    const contactFormContainer = document.querySelectorAll(
      '.js-form-container',
    );
    let formIdxActive = 0;
    contactFormTriggers.forEach((_el, idx) => {
      const el = _el;
      el.onclick = () => {
        if (formIdxActive !== idx) {
          contactFormContainer[formIdxActive].classList.add('hidden');
          contactFormTriggers[formIdxActive].classList.remove(
            'text-purple-light',
          );
          contactFormContainer[idx].classList.remove('hidden');
          contactFormTriggers[idx].classList.add('text-purple-light');
          formIdxActive = idx;
        }
      };
    });
  }
  const paymentMethod = document.querySelector(
    '.woocommerce-order-overview__payment-method strong',
  );
  if (document.documentElement.lang === 'en') {
    const wooStringPayment = document.querySelector(
      '.wc_payment_method.payment_method_bacs',
    );
    if (wooStringPayment !== null) {
      const wooTitle = document.querySelector(
        'label[for="payment_method_bacs"]',
      );
      const wooSubtitle = document.querySelector(
        '.payment_box.payment_method_bacs > p',
      );
      wooTitle.textContent = 'Direct bank transfer';
      wooSubtitle.textContent =
        "Make a bank transfer using the order number as its reference. Your order won't be finished till the payment has been cleared";
    }
    if (
      paymentMethod &&
      paymentMethod.textContent === 'Transferencia bancaria directa'
    ) {
      paymentMethod.textContent = 'Direct bank transfer';
    }
    const paymentMethodInTable = document.querySelectorAll(
      '.shop_table.order_details tfoot tr td',
    );
    if (paymentMethodInTable && paymentMethodInTable.length > 0) {
      paymentMethodInTable.forEach(_el => {
        if (_el.textContent === 'Transferencia bancaria directa') {
          const el = _el;
          el.textContent = 'Direct bank transfer';
        }
      });
    }
    if (paymentMethod) {
      paymentMethod.classList.add('is-ok');
    }
    const productTable = document.querySelector(
      '.woocommerce-table.woocommerce-table--order-details',
    );
    if (productTable) {
      productTable.classList.add('is-ok');
    }
  }
  const cvInput = document.querySelector('.wpcf7-form-control-wrap.cv');
  if (cvInput !== null) {
    cvInput.classList.add(document.documentElement.lang);
  }
  const modalTriggers = document.querySelectorAll('.js-modal-trigger');
  if (modalTriggers.length > 0) {
    const modal = document.querySelector('.js-modal');
    const close = document.querySelector('.js-form-close');
    modalTriggers.forEach(_el => {
      const el = _el;
      el.onclick = () => {
        modal.classList.remove('hidden');
        document.querySelector('html').classList.add('overflow-hidden');
      };
    });
    close.onclick = () => {
      modal.classList.add('hidden');
      document.querySelector('html').classList.remove('overflow-hidden');
    };
  }
};
export default simpleActions;
