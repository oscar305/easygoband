import anime from 'animejs/lib/anime.es';
import { offices } from '../data/data';
import { emailDecode } from './emails';

const mapboxgl = require('mapbox-gl');

const domEl = 'map-el';
const countries = Object.keys(offices).map(key => key);
const mapZoom = 12;
const dotSize = 100;
const moveMapX = -0.06; // to make point visible
const animeSettings = {
  text: { duration: 700, easing: 'cubicBezier(0.8, 0, 0.2, 1)' },
  btn: { duration: 700, easing: 'easeInOutExpo' },
};
let addDot = true;

const cleanNode = node => {
  const range = document.createRange();
  range.selectNodeContents(node);
  range.deleteContents();
};

const initMap = coor => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidWxpLWVnb2IiLCJhIjoiY2sybjFkbmYzMGx0eDNjbG5qcnF5NThzcCJ9.8G78-m6xiPEXzXxVacUl5w';
  const map = new mapboxgl.Map({
    container: domEl,
    style: 'mapbox://styles/uli-egob/ck2n5dr9i11bw1drn9p3e3ges',
    center: [coor[0] + moveMapX, coor[1]],
    zoom: mapZoom,
  });

  const pulsingDot = {
    width: dotSize,
    height: dotSize,
    data: new Uint8Array(dotSize * dotSize * 4),

    onAdd() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },

    render() {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (dotSize / 2) * 0.3;
      const outerRadius = (dotSize / 2) * 0.7 * t + radius;
      const { context } = this;

      // draw outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(192, 192, 192,${1 - t})`;
      context.fill();

      // draw inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 255, 255, 1)';
      context.strokeStyle = 'silver';
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      // update this image's data with data from the canvas
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      // keep the map repainting
      map.triggerRepaint();

      // return `true` to let the map know that the image was updated
      return true;
    },
  };

  map.on('load', () => {
    if (addDot) {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    }

    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: coor,
              },
            },
          ],
        },
      },
      layout: {
        'icon-image': 'pulsing-dot',
      },
    });
  });
  map.scrollZoom.disable();
};

const loadAnimation = () => {
  const triggers = document.querySelectorAll('.js-map-trigger');
  const contacts = document.querySelectorAll('.js-map-contact');
  const gmapBtns = document.querySelector('.js-gmap');
  let idxActive = '0';

  triggers.forEach(_el => {
    const el = _el;

    el.onclick = e => {
      const idxClicked = e.target.dataset.idx;
      if (idxActive !== idxClicked) {
        const officeData = offices[countries[idxClicked]];
        cleanNode(document.querySelector('#map-el')); // clean prev map
        if (officeData.gmap === '') {
          addDot = false;
          gmapBtns.classList.add('hidden');
        } else {
          addDot = true;
          gmapBtns.classList.remove('hidden');
        }
        initMap(officeData.coordinates);
        contacts[idxActive].classList.add('hidden');
        triggers[idxActive].classList.remove('active');
        contacts[idxClicked].classList.remove('hidden');
        triggers[idxClicked].classList.add('active');
        if (!contacts[idxClicked].textContent.includes('@')) {
          const elMail = contacts[idxClicked].querySelector(
            '.js-map-contact a',
          );
          const decode = emailDecode(officeData.email);
          elMail.textContent = decode;
          elMail.setAttribute(
            'href',
            `mailto:${decode}?subject=Contacto desde Easygoband.com`,
          );
        }
        anime({
          targets: contacts[idxClicked],
          duration: animeSettings.text.duration,
          easing: animeSettings.text.easing,
          translateY: ['25%', 0],
          opacity: [0, 1],
        });
        if (officeData.gmap !== '') {
          gmapBtns.setAttribute('href', officeData.gmap);
        }
        anime({
          targets: gmapBtns,
          duration: animeSettings.btn.duration,
          easing: animeSettings.btn.easing,
          translateY: ['40%', 0],
          opacity: [0, 1],
        });
        idxActive = idxClicked;
      }
    };
  });
};

const loadMaps = () => {
  const isContact = document.querySelector('.js-map') !== null;

  if (isContact) {
    initMap(offices.spain.coordinates);
    document.querySelector('.js-gmap').setAttribute('href', offices.spain.gmap);
    const el = document.querySelector('.js-map-contact a');
    const decode = emailDecode(offices.spain.email);
    el.textContent = decode;
    el.setAttribute(
      'href',
      `mailto:${decode}?subject=Contacto desde Easygoband.com`,
    );
    loadAnimation();
  }
};

export default loadMaps;
